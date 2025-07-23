import { 
    CloudRain, 
    Wind, 
    Sun, 
    ThermometerSnowflake, 
    ThermometerSun, 
    Zap, 
    CloudFog, 
    CloudHail, 
    Snowflake, 
    Droplet, 
    AlertTriangle 
} from 'lucide-react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface AlertTemplateProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    borderColor: string;
    backgroundColor: string;
    titleColor: string;
    textColor: string;
}

function AlertTemplate(alert: AlertTemplateProps) {
    return (
        <Box sx={{
            gap: 2,
            borderRadius: 2,
            border: `1px solid ${alert.borderColor}`,
            background: alert.backgroundColor,
            display: 'flex',
            paddingX: 4,
            paddingY: 2.5,
            transition: 'box-shadow 0.2s',
            '&:hover': {
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)',
            }
        }}>
            <Box sx={{ mt: 0.5 }}>
                {alert.icon}
            </Box>
            <Box>
                <Typography variant="h6" component="h6" sx={{ textAlign: 'left', color: alert.titleColor }}>
                    {alert.title}
                </Typography>
                <Typography variant="subtitle1" component="h6" sx={{ textAlign: 'left', color: alert.textColor }}>
                    {alert.text}
                </Typography>
            </Box>
        </Box>
    );
}

const thunderstormAlert: AlertTemplateProps = {
    icon: <Zap size={24} color='#facc15' />, // amarillo
    title: "Tormenta eléctrica",
    text: "Se esperan tormentas eléctricas en la zona. Permanezca en interiores y evite actividades al aire libre.",
    borderColor: '#fde68a',
    backgroundColor: '#fef9c3',
    titleColor: '#b45309',
    textColor: '#92400e'
}

const fogAlert: AlertTemplateProps = {
    icon: <CloudFog size={24} color='#64748b' />,
    title: "Niebla densa",
    text: "La visibilidad es reducida por niebla. Extreme precauciones al conducir y evite actividades al aire libre si es posible.",
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    titleColor: '#334155',
    textColor: '#334155'
}

const hailAlert: AlertTemplateProps = {
    icon: <CloudHail size={24} color='#38bdf8' />,
    title: "Granizo",
    text: "Se prevé caída de granizo. Proteja vehículos y objetos sensibles en el exterior.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

const snowAlert: AlertTemplateProps = {
    icon: <Snowflake size={24} color='#60a5fa' />,
    title: "Nevada intensa",
    text: "Se pronostica una nevada significativa. Tome precauciones al conducir y manténgase informado.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

const frostAlert: AlertTemplateProps = {
    icon: <ThermometerSnowflake size={24} color='#38bdf8' />,
    title: "Helada",
    text: "Se esperan heladas durante la noche. Proteja plantas y tuberías expuestas.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

const lowHumidityAlert: AlertTemplateProps = {
    icon: <Droplet size={24} color='#0ea5e9' />,
    title: "Baja humedad",
    text: "El ambiente es muy seco. Aumenta el riesgo de incendios y puede afectar la salud respiratoria.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

const highPrecipitationProbAlert: AlertTemplateProps = {
    icon: <AlertTriangle size={24} color='#f59e42' />,
    title: "Alta probabilidad de lluvia",
    text: "Hay alta probabilidad de precipitaciones. Prepárese para posibles lluvias.",
    borderColor: '#fef3c7',
    backgroundColor: '#fffbeb',
    titleColor: '#92400e',
    textColor: '#92400e'
}

const rainAlert: AlertTemplateProps = {
    icon: <CloudRain size={24} color='#2563eb' />,
    title: "Fuertes lluvias",
    text: "Se esperan fuertes lluvias. Lleve paraguas y conduzca con precaución.",
    borderColor: '#93c5fd',
    backgroundColor: '#dbeafe',
    titleColor: '#1e40af',
    textColor: '#1e3a8a'
}

const uvAlert: AlertTemplateProps = {
    icon: <Sun size={24} color='#f97316' />,
    title: "Índice UV alto",
    text: "Se detectó un alto índice UV. Use protector solar y limite la exposición al aire libre.",
    borderColor: '#fed7aa',
    backgroundColor: '#fff7ed',
    titleColor: '#9a3412',
    textColor: '#9a3412'
}

const windAlert: AlertTemplateProps = {
    icon: <Wind size={24} color='#64748b' />,
    title: "Fuertes vientos",
    text: "Se detectaron vientos fuertes. Asegure objetos sueltos en el exterior.",
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    titleColor: '#334155',
    textColor: '#334155'
}

const htAlert: AlertTemplateProps = {
    icon: <ThermometerSun size={24} color='#fbbf24' />,
    title: "Alta temperatura",
    text: "Se detectó temperatura extremadamente alta. Manténgase hidratado y evite la exposición prolongada al sol.",
    borderColor: '#fde68a',
    backgroundColor: '#fef9c3',
    titleColor: '#b45309',
    textColor: '#92400e'
}

const ltAlert: AlertTemplateProps = {
    icon: <ThermometerSnowflake size={24} color='#38bdf8' />,
    title: "Baja temperatura",
    text: "Se detectó temperatura extremadamente baja. Abríguese bien y limite la exposición al exterior.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

const AlertUI: React.FC<{ data: OpenMeteoResponse | null }> = ({ data }) => {
    if (!data) return null;

    const alertsToDisplay: AlertTemplateProps[] = [];
    const currentWeather = data.current;
    const todayDaily = data.daily;

    // Find the index of the current time in the hourly data
    const currentHourIndex = data.hourly.time.findIndex(time =>
        new Date(time).getHours() === new Date(currentWeather.time).getHours() &&
        new Date(time).getDate() === new Date(currentWeather.time).getDate()
    );

    // Use current weather data for current conditions where available
    const currentTemp = currentWeather.temperature_2m;
    const currentWindSpeed = currentWeather.wind_speed_10m;
    const currentRelativeHumidity = currentWeather.relative_humidity_2m;
    
    // Get weather_code from hourly data using the found index
    const currentWeatherCode = currentHourIndex !== -1 ? data.hourly.weather_code[currentHourIndex] : undefined;


    // Current weather alerts
    if (currentTemp > 30) {
        alertsToDisplay.push(htAlert);
    } else if (currentTemp < 5) {
        alertsToDisplay.push(ltAlert);
    }

    if (currentWindSpeed > 40) { // Example threshold for strong winds (e.g., > 40 km/h)
        alertsToDisplay.push(windAlert);
    }

    if (currentRelativeHumidity < 30) { // Example threshold for low humidity
        alertsToDisplay.push(lowHumidityAlert);
    }

    // Daily alerts
    if (todayDaily.uv_index_max[0] > 7) { // Example threshold for extreme UV
        alertsToDisplay.push(uvAlert);
    }

    if (todayDaily.precipitation_probability_max[0] > 70) { // Example threshold for high precipitation probability
        alertsToDisplay.push(highPrecipitationProbAlert);
    }

    // Weather code based alerts (using WMO Weather interpretation codes)
    // This is a simplified example, you might want a more detailed mapping.
    if (currentWeatherCode !== undefined) { // Only check if weatherCode is available
        const weatherCode = currentWeatherCode;
        if (weatherCode >= 95 && weatherCode <= 99) { // Thunderstorm codes
            alertsToDisplay.push(thunderstormAlert);
        } else if (weatherCode >= 45 && weatherCode <= 48) { // Fog codes
            alertsToDisplay.push(fogAlert);
        } else if (weatherCode >= 66 && weatherCode <= 67) { // Freezing Rain
            alertsToDisplay.push(hailAlert); // Using hail alert as a proxy, or create a specific freezing rain alert
        } else if (weatherCode >= 71 && weatherCode <= 75) { // Snow fall
            alertsToDisplay.push(snowAlert);
        } else if (weatherCode === 3) { // Fog
            alertsToDisplay.push(fogAlert);
        } else if (weatherCode >= 85 && weatherCode <= 86) { // Snow showers
            alertsToDisplay.push(snowAlert);
        } else if (weatherCode >= 20 && weatherCode <= 29) { // Thunderstorm
            alertsToDisplay.push(thunderstormAlert);
        }
    }


    if (alertsToDisplay.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <AlertTemplate
                    icon={<AlertTriangle size={24} color='#334155' />}
                    title="Sin alertas activas"
                    text="No se han detectado alertas meteorológicas para esta ubicación en este momento."
                    borderColor='#e2e8f0'
                    backgroundColor='#f8fafc'
                    titleColor='#334155'
                    textColor='#334155'
                />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {alertsToDisplay.map((alert, index) => (
                <AlertTemplate key={index} {...alert} />
            ))}
        </Box>
    );
}

export default AlertUI;