import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  labels: string[];
  values1: number[];
  values2: number[];
}

export default function ChartUI({ loading, error, labels, values1, values2 }: ChartUIProps) {
  if (loading) return <Typography>Cargando gráfico...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !values1.length || !values2.length) return <Typography>No hay datos para mostrar.</Typography>;

  return (
    <>
      <Typography variant="h5" component="div" sx={{
        color: '#000'
      }}>
        Temperatura y velocidad del viento por hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: values1, label: 'Temperatura (°C)', showMark: false },
          { data: values2, label: 'Velocidad viento (km/h)', showMark: false },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: labels,
            tickInterval: (value, _) => {
              // value es el string de la hora, por ejemplo "2024-07-20T00:00"
              // Solo muestra tick si la hora es "00:00"
              return value.slice(11, 16) === "00:00";
            },
            valueFormatter: (v: string, context?: { location?: string }) =>
              context?.location === 'tooltip' ? v.slice(0, 10) + " - " + v.slice(11, 16) : v.slice(0, 10),

          }
        ]}
      />
    </>
  );
}