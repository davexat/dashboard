import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  labels: string[];
  values1: number[];
}

export default function ChartUI({ loading, error, labels, values1 }: ChartUIProps) {
  if (loading) return <Typography>Cargando gráfico...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !values1.length) return <Typography>No hay datos para mostrar.</Typography>;

  // Filtrar solo datos de hoy
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const indicesToday = labels.map((label, idx) => label.slice(0, 10) === todayStr ? idx : -1).filter(idx => idx !== -1);
  const todayLabels = indicesToday.map(idx => labels[idx]);
  const todayValues1 = indicesToday.map(idx => values1[idx]);

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
        Temperatura por Hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: todayValues1, label: 'Temperatura (°C)', showMark: false, color: '#ef4444' },
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
            label: 'Temperatura (°C)',
            labelStyle: { fontSize: 16, fontWeight: 500 },
            width: 60,
          }
        ]}
      />
    </Box>
  );
}