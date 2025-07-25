import Typography from '@mui/material/Typography';
import Title from './common/Title';

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
  labels: string[];
  values1: number[];
  values2: number[];
  humidity?: number[];
  weatherCodes?: number[];
}

const TableUI = ({ loading, error, labels, values1, values2, humidity = [], weatherCodes = [] }: TableUIProps) => {
  if (loading) return <Typography>Cargando tabla...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !values1.length || !values2.length || !humidity.length || !weatherCodes.length) {
    return <Typography>No hay datos para mostrar.</Typography>;
  }

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const indicesToday = labels.map((label, idx) => label.slice(0, 10) === todayStr ? idx : -1).filter(idx => idx !== -1).slice(0, 12);
  const hourlyData = indicesToday.map(idx => ({
    time: new Date(labels[idx]).toLocaleTimeString('es-ES', { hour: '2-digit', hour12: true }),
    temperature: Math.round(values1[idx]),
    humidity: humidity[idx],
    windSpeed: values2[idx]?.toFixed(1) || '0.0',
    condition: getWeatherDescription(weatherCodes[idx]),
  }));

  return (
    <div style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '1.5rem 1.5rem 1.5rem 1.5rem', border: '1px solid #f3f4f6' }}>
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
    </div>
  );
};

export default TableUI;