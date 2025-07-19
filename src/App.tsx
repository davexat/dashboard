import { Grid, Typography } from '@mui/material';
import './App.css';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import LocationSelectorUI from './components/LocationSelectorUI';
import IndicatorUI from './components/IndicatorUI';
import Indicator2UI from './components/Indicator2UI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import CohereAssistantUI from './components/WeatherAssistantUI';
import type { Location } from './types/DashboardTypes';
import { useState, useEffect } from 'react';

export const DEFAULT_LOCATION: Location = {
  name: 'Guayaquil',
  lat: -2.1936,
  lon: -79.8777,
  country: 'Ecuador',
  state: 'Guayas',
};

function App() {
  const [city, setCity] = useState<Location>(DEFAULT_LOCATION);
  const [elpepe, etesech] = useState(0);

  useEffect(() => {
    console.log('SCAR DORADA')
    etesech(elpepe+1)
    console.log(elpepe)
  }, [city])

  const dataFetcherOutput = DataFetcher(city);
  
  return (
    <>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="left" alignItems="center" padding={4} spacing={2} boxShadow={"0 2px 6px rgba(0,0,0,0.1)"} borderRadius={2} sx={{background: "linear-gradient(90deg, #4A7BD3 0%, #3255A2 50%, #1A2C6B 100%)"}}>
          <HeaderUI />
        </Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 6 }} spacing={1} container alignItems="center">
          <Typography variant='h4' component='h1'>Alertas</Typography>
          <AlertUI />
        </Grid>

        {/* Selector de localización */}
        <Grid size={{ xs: 12, md: 6 }} container alignItems="center" padding={3} spacing={2} boxShadow={"0 2px 6px rgba(0,0,0,0.1)"} borderRadius={2} sx={{background: "#fff"}}>
          <LocationSelectorUI onLocationSelect={setCity}/>
        </Grid>

        <Grid container size={{ xs: 12, md: 9 }} >
          <Indicator2UI data={dataFetcherOutput}></Indicator2UI>
        </Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }} >

          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
            <>
              <Grid size={{ xs: 12, md: 3 }} >
                <IndicatorUI
                  title='Temperatura (2m)'
                  description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Temperatura aparente'
                  description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Velocidad del viento'
                  description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Humedad relativa'
                  description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
              </Grid>

            </>
          )}
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <ChartUI
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
            labels={dataFetcherOutput.data?.hourly.time ?? []}
            values1={dataFetcherOutput.data?.hourly.temperature_2m ?? []}
            values2={dataFetcherOutput.data?.hourly.wind_speed_10m ?? []}
          />
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
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
