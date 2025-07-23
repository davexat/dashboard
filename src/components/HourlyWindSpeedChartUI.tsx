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
            valueFormatter: (v: string, context?: { location?: string }) => {
              const date = new Date(v);
              const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
              const formattedDate = date.toLocaleDateString('es-ES', options); // e.g., "jul 22"
              const time = v.slice(11, 16); // e.g., "00:00"

              if (context?.location === 'tooltip') {
                // For tooltip, show full date and time
                return `${v.slice(0, 10)} - ${time}`; // e.g., "2024-07-20 - 00:00"
              } else {
                // For axis tick labels, show day and month if it's midnight, otherwise just time
                return time === "00:00" ? formattedDate : time; // Only show date for midnight, otherwise just time
              }
            }
          }
        ]}
      />
    </Box>
  );
}