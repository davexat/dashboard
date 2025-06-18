import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Grid } from '@mui/material';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Bienvenido al dashboard 🔥</h1>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Alertas</Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector</Grid>

        {/* Indicadores */}
        <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Gráfico
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Elemento: Tabla
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
      </Grid>
    </div>
  )
}

export default App
