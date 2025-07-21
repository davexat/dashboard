import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { DataFetcherOutput } from '../types/Interfaces';
import { Thermometer, Droplets, Wind, Sun, Sunrise, Sunset } from 'lucide-react';

interface IndicatorUIProps {
    icon: React.ReactNode;
    type: string;
    indicator: string;
    borderColor: string;
    backgroundColor: string;
}

function IndicatorTemplate(indicator: IndicatorUIProps) {
    return (
        <Box
            sx={{
                borderRadius: 3,
                border: `2px solid ${indicator.borderColor}`,
                background: indicator.backgroundColor,
                p: 2.5,
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                    boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
                    transform: 'scale(1.04)'
                },
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                height: '100%',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {indicator.icon}
                </Box>
                <Typography variant='body2' sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                    {indicator.type}
                </Typography>
            </Box>
            <Typography variant='h4' sx={{ color: '#1e293b', fontWeight: 700, textAlign: 'left' }}>
                {indicator.indicator}
            </Typography>
        </Box>
    )
}

export default function Indicator2UI({ data }: { data: DataFetcherOutput }) {
    const temperature = data.data?.current.temperature_2m;
    const humidity = data.data?.current.relative_humidity_2m;
    const wind = data.data?.current.wind_speed_10m;

    // Obtengo el primer valor de daily para los nuevos indicadores
    const uvIndex = data.data?.daily.uv_index_max?.[0];
    const sunrise = data.data?.daily.sunrise?.[0];
    const sunset = data.data?.daily.sunset?.[0];

    const temperatureProps: IndicatorUIProps = {
        icon: <Thermometer size={32} color="#ef4444" />,
        type: 'Temperatura',
        indicator: (temperature !== undefined && temperature !== null ? temperature.toString() : "N/A") + "°C",
        borderColor: "#fecaca",
        backgroundColor: "#fef2f2",
    };

    const humidityProps: IndicatorUIProps = {
        icon: <Droplets size={32} color="#3b82f6" />,
        type: 'Humedad',
        indicator: (humidity !== undefined && humidity !== null ? humidity.toString() : "N/A") + "%",
        borderColor: "#bae6fd",
        backgroundColor: "#f0f9ff",
    };

    const windProps: IndicatorUIProps = {
        icon: <Wind size={32} color="#22c55e" />,
        type: 'Viento',
        indicator: (wind !== undefined && wind !== null ? wind.toFixed(1) : "N/A") + " km/h",
        borderColor: "#bbf7d0",
        backgroundColor: "#f0fdf4",
    };

    const uvProps: IndicatorUIProps = {
        icon: <Sun size={32} color="#f59e42" />,
        type: 'Índice UV',
        indicator: (uvIndex !== undefined && uvIndex !== null ? uvIndex.toString() : "N/A"),
        borderColor: "#fed7aa",
        backgroundColor: "#fff7ed",
    };

    const sunriseProps: IndicatorUIProps = {
        icon: <Sunrise size={32} color="#fbbf24" />,
        type: 'Amanecer',
        indicator: sunrise ? sunrise.slice(11, 16) : "N/A", // Extrae HH:MM
        borderColor: "#fde68a",
        backgroundColor: "#fef9c3",
    };

    const sunsetProps: IndicatorUIProps = {
        icon: <Sunset size={32} color="#f87171" />,
        type: 'Atardecer',
        indicator: sunset ? sunset.slice(11, 16) : "N/A", // Extrae HH:MM
        borderColor: "#fca5a5",
        backgroundColor: "#fef2f2",
    };

    return (
        <>
            <IndicatorTemplate {...temperatureProps} />
            <IndicatorTemplate {...humidityProps} />
            <IndicatorTemplate {...windProps} />
            <IndicatorTemplate {...uvProps} />
            <IndicatorTemplate {...sunriseProps} />
            <IndicatorTemplate {...sunsetProps} />
        </>
    );
}