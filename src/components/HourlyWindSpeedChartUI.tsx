import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface HourlyWindSpeedChartUIProps {
  loading: boolean;
  error: string | null;
  labels: string[]; // Hourly time labels
  windSpeeds: number[];
}

export default function HourlyWindSpeedChartUI({ loading, error, labels, windSpeeds }: HourlyWindSpeedChartUIProps) {
  if (loading) return <Typography>Cargando gráfico de velocidad del viento...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !windSpeeds.length) return <Typography>No hay datos de velocidad del viento para mostrar.</Typography>;

  // Filtrar solo datos de hoy
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const indicesToday = labels.map((label, idx) => label.slice(0, 10) === todayStr ? idx : -1).filter(idx => idx !== -1);
  const todayLabels = indicesToday.map(idx => labels[idx]);
  const todayWindSpeeds = indicesToday.map(idx => windSpeeds[idx]);

  // Mostrar ticks dinámicamente: solo algunas horas si hay muchas
  const tickStep = todayLabels.length > 12 ? Math.ceil(todayLabels.length / 12) : 1;

  return (
    <Box
      sx={{
        background: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        padding: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Typography variant="h5" component="div" sx={{
        color: '#334155',
        fontWeight: 600,
        mb: 2,
      }}>
        Velocidad del Viento por Hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: todayWindSpeeds, label: 'Velocidad viento (km/h)', showMark: false, color: '#64748b' },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: todayLabels,
            tickInterval: (_, idx) => idx % tickStep === 0,
            valueFormatter: (v, context) => {
              const time = v.slice(11, 16);
              if (context?.location === 'tooltip') {
                return `${v.slice(0, 10)} - ${time}`;
              } else {
                return time;
              }
            },
            label: 'Hora',
            labelStyle: { fontSize: 16, fontWeight: 500 },
          }
        ]}
        yAxis={[
          {
            min: 0,
            label: 'Velocidad viento (km/h)',
            labelStyle: { fontSize: 16, fontWeight: 500 },
            width: 60,
          }
        ]}
      />
    </Box>
  );
}