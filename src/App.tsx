import './App.css';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import LocationSelectorUI from './components/LocationSelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import InsightUI from './components/InsightUI';
import TableUI from './components/TableUI';
import { DailyTemperatureChart, PrecipitationBarChart, TodayTemperatureChart } from './components/ChartUI';
import CohereAssistantUI from './components/WeatherAssistantUI';
import type { Location } from './types/DashboardTypes';
import { useState } from 'react';

export const DEFAULT_LOCATION: Location = {
  name: 'Guayaquil',
  lat: -2.1936,
  lon: -79.8777,
  country: 'Ecuador',
  state: 'Guayas',
};

function App() {
  const [city, setCity] = useState<Location>(DEFAULT_LOCATION);
  const dataFetcherOutput = DataFetcher(city);
  const hasPrecipitation = dataFetcherOutput.data?.daily.rain_sum && Math.max(...dataFetcherOutput.data.daily.rain_sum) > 0;

  return (
    <>
      <Grid container spacing={4} sx={{ width: '100%' }} justifyContent="center" alignItems="flex-start">
        <Grid size={{ xs: 12 }}>
          <HeaderUI />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }} container spacing={4}>
          <LocationSelectorUI onLocationSelect={setCity} />
          <IndicatorUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            temperature={dataFetcherOutput.data?.current?.temperature_2m ?? 0}
            humidity={dataFetcherOutput.data?.current?.relative_humidity_2m ?? 0}
            windSpeed={dataFetcherOutput.data?.current?.wind_speed_10m ?? 0}
            uvIndex={dataFetcherOutput.data?.daily?.uv_index_max[0] ?? 0}
            sunrise={dataFetcherOutput.data?.daily?.sunrise[0] ?? '00:00'}
            sunset={dataFetcherOutput.data?.daily?.sunset[0] ?? '00:00'}
          />
          <DailyTemperatureChart
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            maxTemperature={dataFetcherOutput.data?.daily.temperature_2m_max ?? []}
            minTemperature={dataFetcherOutput.data?.daily.temperature_2m_min ?? []}
            date={dataFetcherOutput.data?.daily.time ?? []}
          />
          {hasPrecipitation ? (
            <PrecipitationBarChart
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
              rainSum={dataFetcherOutput.data?.daily.rain_sum ?? []}
              time={dataFetcherOutput.data?.daily.time ?? []}
            />
          ) : null}
        </Grid>

        <Grid size={{ xs: 12, md: 5 }} container spacing={5}>
          <AlertUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            currentTemperature={dataFetcherOutput.data?.current?.temperature_2m ?? 0}
            currentWindSpeed={dataFetcherOutput.data?.current?.wind_speed_10m ?? 0}
            currentRelativeHumidity={dataFetcherOutput.data?.current?.relative_humidity_2m ?? 0}
            currentWeatherCode={dataFetcherOutput.data?.current?.weather_code ?? 0}
            currentPrecipitation={dataFetcherOutput.data?.current?.precipitation ?? 0}
            currentShowers={dataFetcherOutput.data?.current?.showers ?? 0}
            currentRain={dataFetcherOutput.data?.current?.rain ?? 0}
            currentSnowfall={dataFetcherOutput.data?.current?.snowfall ?? 0}
            currentCloudCover={dataFetcherOutput.data?.current?.cloud_cover ?? 0}
            dailyUvIndexMax={dataFetcherOutput.data?.daily.uv_index_max ?? []}
            dailyPrecipitationProbabilityMax={dataFetcherOutput.data?.daily.precipitation_probability_max ?? []}
            dailySnowfallSum={dataFetcherOutput.data?.daily.snowfall_sum ?? []}
            dailyRainSum={dataFetcherOutput.data?.daily.rain_sum ?? []}
            hourlyWindSpeed={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
          />
          <TableUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            date={dataFetcherOutput.data?.hourly.time ?? []}
            temperature={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            windSpeed={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
            humidity={dataFetcherOutput.data?.hourly.relative_humidity_2m ?? []}
            weatherCodes={dataFetcherOutput.data?.hourly.weather_code ?? []}
            currentTime={dataFetcherOutput.data?.current?.time ?? ''}
          />
          {hasPrecipitation ? (
            <InsightUI
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
              data={dataFetcherOutput.data}
            />
          ) : null}
        </Grid>

        <Grid size={{ xs: 12, md: hasPrecipitation ? 12 : 6 }} container>
          <TodayTemperatureChart
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            temperature={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            apparentTemp={dataFetcherOutput.data?.hourly.apparent_temperature ?? []}
            time={dataFetcherOutput.data?.hourly.time ?? []}
          />
        </Grid>

        {hasPrecipitation ? null : (
          <Grid size={{ xs: 12, md: 6 }} container>
            <InsightUI
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
              data={dataFetcherOutput.data}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }} container>
          <CohereAssistantUI
            weatherData={dataFetcherOutput.data?.current}
            weatherInfo={dataFetcherOutput.data?.hourly}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
