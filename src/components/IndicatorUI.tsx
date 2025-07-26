import type { DataFetcherOutput } from '../types/Interfaces';
import { Thermometer, Droplets, Wind, Sun, Sunrise, Sunset } from 'lucide-react';
import { Title, Container } from './common/UI';

interface IndicatorTemplateProps {
    icon: React.ReactNode;
    type: string;
    indicator: string;
    borderColor: string;
    backgroundColor: string;
}

function IndicatorTemplate(indicator: IndicatorTemplateProps) {
    return (
        <div
            style={{
                borderRadius: 12,
                border: `2px solid ${indicator.borderColor}`,
                background: indicator.backgroundColor,
                padding: '1.25rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: undefined,
                flex: '1 0 225px'
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px 0 rgba(0,0,0,0.10)';
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                (e.currentTarget as HTMLDivElement).style.transform = '';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {indicator.icon}
                </div>
                <h4 style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', margin: '0' }}>
                    {indicator.type}
                </h4>
            </div>
            <h2 style={{ color: '#1e293b', fontWeight: 700, textAlign: 'left', fontSize: '1.8rem', margin: '0.8rem 0 0 0' }}>
                {indicator.indicator}
            </h2>
        </div>
    )
}

interface IndicatorUIProps {
    loading: boolean;
    error: string | null;
    temperature: number;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    sunrise: string;
    sunset: string;
}

export default function IndicatorUI({ loading, error, temperature, humidity, windSpeed, uvIndex, sunrise, sunset }: IndicatorUIProps) {
    if (loading) {
        return <div>Cargando indicadores...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const indicatorProps: IndicatorTemplateProps[] = [
        {
            icon: <Thermometer size={32} color="#ef4444" />,
            type: 'Temperatura',
            indicator: (temperature !== undefined && temperature !== null ? temperature.toString() : "N/A") + "°C",
            borderColor: "#fecaca",
            backgroundColor: "#fef2f2",
        },
        {
            icon: <Droplets size={32} color="#3b82f6" />,
            type: 'Humedad',
            indicator: (humidity !== undefined && humidity !== null ? humidity.toString() : "N/A") + "%",
            borderColor: "#bae6fd",
            backgroundColor: "#f0f9ff",
        },
        {
            icon: <Wind size={32} color="#22c55e" />,
            type: 'Viento',
            indicator: (windSpeed !== undefined && windSpeed !== null ? windSpeed.toFixed(1) : "N/A") + " km/h",
            borderColor: "#bbf7d0",
            backgroundColor: "#f0fdf4",
        },
        {
            icon: <Sun size={32} color="#f59e42" />,
            type: 'Índice UV',
            indicator: (uvIndex !== undefined && uvIndex !== null ? uvIndex.toString() : "N/A"),
            borderColor: "#fed7aa",
            backgroundColor: "#fff7ed",
        },
        {
            icon: <Sunrise size={32} color="#fbbf24" />,
            type: 'Amanecer',
            indicator: sunrise ? sunrise.slice(11, 16) : "N/A",
            borderColor: "#fde68a",
            backgroundColor: "#fbfae3",
        },
        {
            icon: <Sunset size={32} color="#717af8" />,
            type: 'Atardecer',
            indicator: sunset ? sunset.slice(11, 16) : "N/A",
            borderColor: "#b5a5fc",
            backgroundColor: "#f2f2fe",
        },
    ];

    return (
        <Container>
            <Title children='Condiciones Actuales' />
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                width: '100%',
                boxSizing: 'border-box',
                maxWidth: '100%',
            }}>
                {indicatorProps.map((props) => (
                    <IndicatorTemplate key={props.type} {...props} />
                ))}
            </div>
        </Container>
    );
}