import { Grid, Typography } from '@mui/material';
import './App.css';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import LocationSelectorUI from './components/LocationSelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import DailyTemperatureChartUI from './components/DailyTemperatureChartUI';
import HourlyWindSpeedChartUI from './components/HourlyWindSpeedChartUI';
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
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="left" alignItems="center" padding={4} spacing={2} boxShadow={"0 2px 6px rgba(0,0,0,0.1)"} borderRadius={2} sx={{ background: "linear-gradient(90deg, #4A7BD3 0%, #3255A2 50%, #1A2C6B 100%)" }}>
          <HeaderUI />
        </Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 6 }} spacing={1} container alignItems="center">
          <Typography variant='h4' component='h1'>Alertas</Typography>
          <AlertUI />
        </Grid>

        {/* Selector de localización */}
        <Grid size={{ xs: 12, md: 6 }} container alignItems="center" padding={3} spacing={2} boxShadow={"0 2px 6px rgba(0,0,0,0.1)"} borderRadius={2} sx={{ background: "#fff" }}>
          <LocationSelectorUI onLocationSelect={setCity} />
        </Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, lg: 9 }} alignItems="center" justifyContent="center">
          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
            <>
              <IndicatorUI data={dataFetcherOutput} />
            </>
          )}
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, lg: 6 }}
          sx={{
            display: { md: 'block' },
          }}>
          <ChartUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            values1={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            values2={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
          />
        </Grid>

        {/* Gráfico de Temperatura Diaria (Nuevo) */}
        <Grid size={{ xs: 12, lg: 6 }}
          sx={{
            display: { md: 'block' },
          }}>
          <DailyTemperatureChartUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.daily.time ?? []}
            maxTemperatures={dataFetcherOutput.data?.daily.temperature_2m_max ?? []}
            minTemperatures={dataFetcherOutput.data?.daily.temperature_2m_min ?? []}
          />
        </Grid>

        {/* Gráfico de Velocidad del Viento Horaria (Nuevo) */}
        <Grid size={{ xs: 12, lg: 6 }}
          sx={{
            display: { md: 'block' },
          }}>
          <HourlyWindSpeedChartUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            windSpeeds={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
          />
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 8, lg: 6 }}
          sx={{
            display: { md: 'block' }
          }}>
          <TableUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            values1={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            values2={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
          />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>
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
