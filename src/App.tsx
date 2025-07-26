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
          <DailyTemperatureChart data={dataFetcherOutput} />
          <PrecipitationBarChart data={dataFetcherOutput} />
          <TodayTemperatureChart data={dataFetcherOutput} />
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
            <>
              <IndicatorUI data={dataFetcherOutput} />
            </>
          )}
        </Grid>

        <Grid size={{ xs: 15, lg: 6 }}>
          <TableUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            values1={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            values2={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
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
