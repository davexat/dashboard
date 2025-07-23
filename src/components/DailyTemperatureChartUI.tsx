import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface DailyTemperatureChartUIProps {
  loading: boolean;
  error: string | null;
  labels: string[]; // Daily time labels
  maxTemperatures: number[];
  minTemperatures: number[];
}

export default function DailyTemperatureChartUI({ loading, error, labels, maxTemperatures, minTemperatures }: DailyTemperatureChartUIProps) {
  if (loading) return <Typography>Cargando gráfico de temperaturas semanales...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !maxTemperatures.length || !minTemperatures.length) return <Typography>No hay datos de temperatura semanal para mostrar.</Typography>;

  return (
    <>
      <Typography variant="h5" component="div" sx={{
        color: '#000'
      }}>
        Temperatura Diaria (Máx/Mín)
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: maxTemperatures, label: 'Temp. Máx (°C)', showMark: false, color: '#ff7043' }, // Orange for max temp
          { data: minTemperatures, label: 'Temp. Mín (°C)', showMark: false, color: '#29b6f6' }, // Blue for min temp
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: labels,
            // Format for daily labels (e.g., "07-22")
            valueFormatter: (v: string) => v.slice(5, 10), 
          }
        ]}
      />
    </>
  );
}