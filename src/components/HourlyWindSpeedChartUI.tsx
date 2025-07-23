import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

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

  return (
    <>
      <Typography variant="h5" component="div" sx={{
        color: '#000'
      }}>
        Velocidad del Viento por Hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: windSpeeds, label: 'Velocidad viento (km/h)', showMark: false, color: '#64748b' }, // Gray for wind
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: labels,
            tickInterval: (value, _) => {
              // Only show tick if the hour is "00:00"
              return value.slice(11, 16) === "00:00";
            },
            valueFormatter: (v: string, context?: { location?: string }) =>
              context?.location === 'tooltip' ? v.slice(0, 10) + " - " + v.slice(11, 16) : v.slice(5, 10), // Show only time for X-axis labels
          }
        ]}
      />
    </>
  );
}