import { Sun, ThumbsUp, Droplets, TrendingUp } from 'lucide-react';
import { Title, Container } from './common/UI';
import { Box, Typography } from '@mui/material';
import type { DataFetcherOutput } from '../types/DashboardTypes';

interface InsightTemplateProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    backgroundColor: string;
}

function InsightTemplate(insight: InsightTemplateProps) {
    return (
        <Box className='insightContainer' sx={{
            background: insight.backgroundColor,
        }}>
            <Box sx={{ mt: 0.5 }}>
                {insight.icon}
            </Box>
            <Box>
                <Typography variant="subtitle1" component="h6" sx={{ textAlign: 'left', color: '#1C1C1C' }}>
                    {insight.title}
                </Typography>
                <Typography variant="subtitle2" component="h6" sx={{ textAlign: 'left', color: '#1C1C1C' }}>
                    {insight.text}
                </Typography>
            </Box>
        </Box>
    );
}

export default function InsightUI({ loading, error, data }: DataFetcherOutput) {
    if (loading) return <Typography>Cargando insights...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!data || !data.current || !data.daily) return null;

    const current = data.current;
    const currentDesc = (() => {
        if ([0, 1, 2].includes(current.weather_code)) return 'Cielo despejado';
        if ([45, 48, 3].includes(current.weather_code)) return 'Niebla';
        if ((current.weather_code >= 51 && current.weather_code <= 67) || (current.weather_code >= 61 && current.weather_code <= 65)) return 'Lluvia';
        if ((current.weather_code >= 71 && current.weather_code <= 77) || (current.weather_code >= 85 && current.weather_code <= 86)) return 'Nieve';
        if ((current.weather_code >= 80 && current.weather_code <= 82)) return 'Chubascos';
        if ((current.weather_code >= 95 && current.weather_code <= 99) || (current.weather_code >= 20 && current.weather_code <= 29)) return 'Tormenta';
        return 'Condiciones variables';
    })();

    let tipTitle = 'Recomendación meteorológica';
    let tipText = '';
    if (current.temperature_2m >= 20 && current.temperature_2m <= 28 && currentDesc === 'Cielo despejado') {
        tipTitle = 'Clima perfecto';
        tipText = '¡Excelentes condiciones para actividades al aire libre! Disfruta tu día.';
    } else if (current.temperature_2m < 10) {
        tipText = 'Hace frío, considera abrigarte bien si sales.';
    } else if (current.temperature_2m > 30) {
        tipText = 'Hace calor intenso, mantente hidratado y evita el sol directo.';
    } else if (currentDesc === 'Lluvia' || currentDesc === 'Chubascos') {
        tipText = 'Se esperan lluvias, lleva paraguas si vas a salir.';
    } else if (currentDesc === 'Tormenta') {
        tipText = 'Precaución: posibles tormentas eléctricas.';
    } else {
        tipText = 'Consulta el pronóstico para planear tus actividades.';
    }

    let thirdTitle = '';
    let thirdText = '';
    let thirdBg = '';
    if (current.relative_humidity_2m >= 80) {
        thirdTitle = 'Humedad elevada';
        thirdText = `La humedad actual es del ${current.relative_humidity_2m}%, un valor alto para esta época.`;
        thirdBg = '#E0F2FE';
    } else {
        const temps = data.daily.temperature_2m_max;
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
        const trend = temps[temps.length - 1] > temps[0] ? 'ascendente' : 'descendente';
        thirdTitle = 'Tendencia de temperatura';
        thirdText = `Temperatura media semanal: ${avgTemp.toFixed(1)}°C. La tendencia es ${trend} en los próximos 7 días.`;
        thirdBg = '#DBEAFE';
    }

    const insightsData = [
        {
            icon: <Sun size={20} color="#2563EB" />,
            title: 'Condiciones actuales',
            text: `${currentDesc} con ${current.temperature_2m}°C. Humedad al ${current.relative_humidity_2m}% y viento de ${current.wind_speed_10m} km/h.`,
            backgroundColor: '#DBEAFE',
        },
        {
            icon: <ThumbsUp size={20} color="#65A30D" />,
            title: tipTitle,
            text: tipText,
            backgroundColor: '#F0FDF4',
        },
        {
            icon: current.relative_humidity_2m >= 80
                ? <Droplets size={20} color="#0EA5E9" />
                : <TrendingUp size={20} color="#2563EB" />,
            title: thirdTitle,
            text: thirdText,
            backgroundColor: thirdBg,
        },
    ];

    return (
        <Container container={false}>
            <Title>Resumen del Clima</Title>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {insightsData.map((insight, idx) => (
                    <InsightTemplate key={idx} {...insight} />
                ))}
            </Box>
        </Container>
    );
}