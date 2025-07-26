import './App.css';
import { Grid, Typography } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import LocationSelectorUI from './components/LocationSelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
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

  return (
    <>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 15, md: 15 }}>
          <HeaderUI />
        </Grid>
        <Grid size={{ xs: 15, md: 6 }}>
          <LocationSelectorUI onLocationSelect={setCity} />
        </Grid>
        <Grid size={{ xs: 15, md: 6 }}>
          <DailyTemperatureChart
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            maxTemperature={dataFetcherOutput.data?.daily.temperature_2m_max ?? []}
            minTemperature={dataFetcherOutput.data?.daily.temperature_2m_min ?? []}
            date={dataFetcherOutput.data?.daily.time ?? []}
          />
          <PrecipitationBarChart
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            rainSum={dataFetcherOutput.data?.daily.rain_sum ?? []}
            time={dataFetcherOutput.data?.daily.time ?? []}
          />
          <TodayTemperatureChart
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            temperature={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            apparentTemp={dataFetcherOutput.data?.hourly.apparent_temperature ?? []}
            time={dataFetcherOutput.data?.hourly.time ?? []}
          />
        </Grid>
        <Grid size={{ xs: 15, md: 6 }}>
          {dataFetcherOutput.loading ? (
            <Typography>Cargando alertas...</Typography>
          ) : dataFetcherOutput.error ? (
            <Typography color="error">Error al cargar alertas: {dataFetcherOutput.error}</Typography>
          ) : (
            <AlertUI data={dataFetcherOutput.data} />
          )}
        </Grid>

        <Grid size={{ xs: 15, lg: 6 }}>
          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
            <IndicatorUI
              loading={dataFetcherOutput.loading}
              error={dataFetcherOutput.error}
              temperature={dataFetcherOutput.data?.current?.temperature_2m}
              humidity={dataFetcherOutput.data?.current?.relative_humidity_2m}
              windSpeed={dataFetcherOutput.data?.current?.wind_speed_10m}
              uvIndex={dataFetcherOutput.data?.daily?.uv_index_max[0]}
              sunrise={dataFetcherOutput.data?.daily?.sunrise[0]}
              sunset={dataFetcherOutput.data?.daily?.sunset[0]}
            />
          )}
        </Grid>

        <Grid size={{ xs: 15, lg: 6 }}>
          <TableUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            temperature={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            windSpeed={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
            humidity={dataFetcherOutput.data?.hourly.relative_humidity_2m ?? []}
            weatherCodes={dataFetcherOutput.data?.hourly.weather_code ?? []}
          />
        </Grid>

        <Grid size={{ xs: 15, md: 15 }}>
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
