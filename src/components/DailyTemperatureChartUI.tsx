import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    <Box
      sx={{ // Apply consistent styling
        background: '#ffffff', // White background
        borderRadius: 3, // Rounded corners
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Subtle shadow
        padding: 3, // Padding inside the box
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)', // Slightly more pronounced shadow on hover
        },
      }}
    >
      <Typography variant="h5" component="div" sx={{
        color: '#334155', // Darker text for heading
        fontWeight: 600,
        mb: 2, // Margin bottom for spacing
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
            // Format for daily labels (e.g., "Jul 22")
            valueFormatter: (v: string) => {
              const date = new Date(v);
              const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
              return date.toLocaleDateString('es-ES', options);
            },
          }
        ]}
      />
    </Box>
  );
}