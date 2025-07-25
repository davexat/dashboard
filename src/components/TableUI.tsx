import Typography from '@mui/material/Typography';
import { Title, Container } from './common/UI';

function getWeatherDescription(code: number): string {
  if ([0, 1, 2].includes(code)) return 'Despejado';
  if ([45, 48, 3].includes(code)) return 'Niebla';
  if ((code >= 51 && code <= 67) || (code >= 61 && code <= 65)) return 'Lluvia';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'Nieve';
  if ((code >= 80 && code <= 82)) return 'Chubascos';
  if ((code >= 95 && code <= 99) || (code >= 20 && code <= 29)) return 'Tormenta';
  return 'Desconocido';
}

interface TableUIProps {
  loading: boolean;
  error: string | null;
  date: string[];
  temperature: number[];
  windSpeed: number[];
  humidity: number[];
  weatherCodes: number[];
  currentTime: string;
}

export default function TableUI({ loading, error, date: labels, temperature, windSpeed, humidity, weatherCodes, currentTime }: TableUIProps) {
  if (loading) return <Typography>Cargando tabla...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const currentDate = new Date(currentTime);
  const currentIdx = labels.findIndex(label => {
    const labelDate = new Date(label);
    return labelDate >= currentDate;
  });
  
  const startIdx = currentIdx !== -1 ? currentIdx : 0;
  const indicesToShow = Array.from({ length: 12 }, (_, i) => startIdx + i).filter(idx => idx < labels.length);
  const hourlyData = indicesToShow.map(idx => ({
    time: new Date(labels[idx]).toLocaleTimeString('es-ES', { hour: '2-digit', hour12: true }),
    temperature: Math.round(temperature[idx]),
    humidity: humidity[idx],
    windSpeed: windSpeed[idx]?.toFixed(1) || '0.0',
    condition: getWeatherDescription(weatherCodes[idx]),
  }));

  return (
    <Container>
      <Title children='Pronóstico por Horas' />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'center', padding: '0.5rem 0.25rem', fontWeight: 600, color: '#374151' }}>Hora</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0.25rem', fontWeight: 600, color: '#374151' }}>Temp</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0.25rem', fontWeight: 600, color: '#374151' }}>Humedad</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0.25rem', fontWeight: 600, color: '#374151' }}>Viento</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0.25rem', fontWeight: 600, color: '#374151' }}>Condición</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((hour, index) => {
              const isLast = index === hourlyData.length - 1;
              return (
                <tr
                  key={index}
                  style={{
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    borderBottom: isLast ? 'none' : '1px solid #e5e7eb'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td style={{ padding: '0.5rem 0.25rem', fontWeight: 500, color: '#111827' }}>{hour.time}</td>
                  <td style={{ padding: '0.5rem 0.25rem', textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '1.3rem', background: '#dbeafe', color: '#1e40af', borderRadius: '0.375rem', fontWeight: 600, padding: '0.2rem 0.5rem' }}>
                      {hour.temperature}° C
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem 0.25rem', textAlign: 'center', color: '#4b5563' }}>{hour.humidity}%</td>
                  <td style={{ padding: '0.5rem 0.25rem', textAlign: 'center', color: '#4b5563' }}>{hour.windSpeed} km/h</td>
                  <td style={{ padding: '0.5rem 0.25rem', color: '#374151' }}>{hour.condition}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};