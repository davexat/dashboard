import { Wind, Sun, ThermometerSun, Zap, CloudFog, CloudHail, Snowflake, Droplet, AlertTriangle } from 'lucide-react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

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
    icon: <Zap size={24} color='#facc15' />,
    title: "Tormenta eléctrica",
    text: "Se esperan tormentas eléctricas en la zona. Permanezca en interiores y evite actividades al aire libre.",
    borderColor: '#fde68a',
    backgroundColor: '#fef9c3',
    titleColor: '#b45309',
    textColor: '#92400e'
}

const heavyRainAlert: AlertTemplateProps = {
    icon: <Droplet size={24} color='#2563eb' />,
    title: 'Lluvia intensa',
    text: 'Se detecta lluvia intensa en este momento. Extreme precauciones al salir.',
    borderColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    titleColor: '#1e3a8a',
    textColor: '#1e3a8a'
};

const rainAccumulationAlert: AlertTemplateProps = {
    icon: <Droplet size={24} color='#0ea5e9' />,
    title: 'Acumulación de lluvia',
    text: 'Se espera una acumulación significativa de lluvia hoy. Riesgo de inundaciones.',
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
};

const snowAccumulationAlert: AlertTemplateProps = {
    icon: <Snowflake size={24} color='#60a5fa' />,
    title: 'Acumulación de nieve',
    text: 'Se espera una acumulación significativa de nieve hoy. Riesgo de bloqueos y accidentes. Evite conducir si es posible.',
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
};

const currentSnowfallAlert: AlertTemplateProps = {
    icon: <Snowflake size={24} color='#60a5fa' />,
    title: 'Nevada actual',
    text: 'Está nevando en este momento. Precaución al salir y conducir.',
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
};

const dailyMaxTemperatureAlert: AlertTemplateProps = {
    icon: <ThermometerSun size={24} color='#fbbf24' />,
    title: 'Temperatura máxima diaria extrema',
    text: 'Se espera una temperatura máxima muy alta hoy. Manténgase hidratado y evite la exposición al sol.',
    borderColor: '#fde68a',
    backgroundColor: '#fef9c3',
    titleColor: '#b45309',
    textColor: '#92400e'
};

const dailyMinTemperatureAlert: AlertTemplateProps = {
    icon: <Snowflake size={24} color='#38bdf8' />,
    title: 'Temperatura mínima diaria extrema',
    text: 'Se espera una temperatura mínima muy baja hoy. Abríguese bien y evite salir si no es necesario.',
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
};

const hourlyExtremeTemperatureAlert: AlertTemplateProps = {
    icon: <ThermometerSun size={24} color='#fbbf24' />,
    title: 'Temperatura extrema próxima hora',
    text: 'Se pronostica temperatura extrema en la próxima hora. Tome precauciones.',
    borderColor: '#fde68a',
    backgroundColor: '#fef9c3',
    titleColor: '#b45309',
    textColor: '#92400e'
};

const hourlyWeatherCodeAlert: AlertTemplateProps = {
    icon: <AlertTriangle size={24} color='#f59e42' />,
    title: 'Alerta meteorológica próxima hora',
    text: 'Se pronostica evento meteorológico relevante en la próxima hora. Manténgase informado.',
    borderColor: '#fef3c7',
    backgroundColor: '#fffbeb',
    titleColor: '#92400e',
    textColor: '#92400e'
};

const forecastStrongWindAlert: AlertTemplateProps = {
    icon: <Wind size={24} color='#64748b' />,
    title: 'Viento fuerte pronosticado',
    text: 'Se pronostican vientos fuertes en las próximas horas. Asegure objetos sueltos.',
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    titleColor: '#334155',
    textColor: '#334155'
};

const extremeCloudCoverAlert: AlertTemplateProps = {
    icon: <CloudFog size={24} color='#64748b' />,
    title: 'Nubosidad extrema',
    text: 'El cielo está completamente cubierto. Puede afectar la visibilidad.',
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    titleColor: '#334155',
    textColor: '#334155'
};

const showersAlert: AlertTemplateProps = {
    icon: <Droplet size={24} color='#38bdf8' />,
    title: 'Chubascos',
    text: 'Se detectan chubascos en la zona. Precaución al conducir.',
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
};

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
    icon: <Snowflake size={24} color='#38bdf8' />,
    title: "Baja temperatura",
    text: "Se detectó temperatura extremadamente baja. Abríguese bien y limite la exposición al exterior.",
    borderColor: '#bae6fd',
    backgroundColor: '#f0f9ff',
    titleColor: '#0369a1',
    textColor: '#0e7490'
}

interface AlertUIProps {
    loading: boolean;
    error: string | null;
    currentTemperature: number;
    currentWindSpeed: number;
    currentRelativeHumidity: number;
    currentWeatherCode: number;
    currentPrecipitation: number;
    currentShowers: number;
    currentRain: number;
    currentSnowfall: number;
    currentCloudCover: number;
    dailyUvIndexMax: number[];
    dailyPrecipitationProbabilityMax: number[];
    dailyTemperatureMax: number[];
    dailyTemperatureMin: number[];
    dailySnowfallSum: number[];
    dailyRainSum: number[];
    hourlyWeatherCodes: number[];
    hourlyTemperature: number[];
    hourlyWindSpeed: number[];
}

export default function AlertUI({
    loading,
    error,
    currentTemperature,
    currentWindSpeed,
    currentRelativeHumidity,
    currentWeatherCode,
    currentPrecipitation,
    currentShowers,
    currentRain,
    currentSnowfall,
    currentCloudCover,
    dailyUvIndexMax,
    dailyPrecipitationProbabilityMax,
    dailyTemperatureMax,
    dailyTemperatureMin,
    dailySnowfallSum,
    dailyRainSum,
    hourlyWeatherCodes,
    hourlyTemperature,
    hourlyWindSpeed
}: AlertUIProps) {
    if (loading) {
        return <div>Cargando alertas...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    const alertsToDisplay: AlertTemplateProps[] = [];

    // Precipitación actual
    if (currentPrecipitation > 10 || currentRain > 10) { // umbral ejemplo: >10mm
        alertsToDisplay.push(heavyRainAlert);
    }

    // Acumulación de lluvia diaria
    if (dailyRainSum[0] > 30) { // umbral ejemplo: >30mm
        alertsToDisplay.push(rainAccumulationAlert);
    }


    // Acumulación de nieve diaria
    if (dailySnowfallSum[0] > 10) { // umbral ejemplo: >10cm
        alertsToDisplay.push(snowAccumulationAlert);
    }

    // Nevada actual
    if (currentSnowfall > 5) { // umbral ejemplo: >5cm
        alertsToDisplay.push(currentSnowfallAlert);
    }

    // Temperatura máxima diaria extrema
    if (dailyTemperatureMax[0] > 35) {
        alertsToDisplay.push(dailyMaxTemperatureAlert);
    }

    // Temperatura mínima diaria extrema
    if (dailyTemperatureMin[0] < 0) {
        alertsToDisplay.push(dailyMinTemperatureAlert);
    }

    // Temperatura extrema próxima hora
    if (Math.max(...hourlyTemperature) > 35 || Math.min(...hourlyTemperature) < 0) {
        alertsToDisplay.push(hourlyExtremeTemperatureAlert);
    }

    // Alerta meteorológica próxima hora por weather code
    if (hourlyWeatherCodes.some(code => code >= 95 && code <= 99)) {
        alertsToDisplay.push(hourlyWeatherCodeAlert);
    }

    // Viento fuerte pronosticado
    if (Math.max(...hourlyWindSpeed) > 40) { // umbral ejemplo: >40km/h
        alertsToDisplay.push(forecastStrongWindAlert);
    }

    // Nubosidad extrema actual
    if (currentCloudCover > 90) {
        alertsToDisplay.push(extremeCloudCoverAlert);
    }

    // Chubascos actuales
    if (currentShowers > 5) { // umbral ejemplo: >5mm
        alertsToDisplay.push(showersAlert);
    }

    // Temperatura alta actual
    if (currentTemperature > 30) {
        alertsToDisplay.push(htAlert);
    } else if (currentTemperature < 5) {
        alertsToDisplay.push(ltAlert);
    }

    // Viento fuerte actual
    if (currentWindSpeed > 40) {
        alertsToDisplay.push(windAlert);
    }

    // Baja humedad
    if (currentRelativeHumidity < 30) {
        alertsToDisplay.push(lowHumidityAlert);
    }

    // UV alto
    if (dailyUvIndexMax[0] > 7) {
        alertsToDisplay.push(uvAlert);
    }

    // Alta probabilidad de lluvia
    if (dailyPrecipitationProbabilityMax[0] > 70) {
        alertsToDisplay.push(highPrecipitationProbAlert);
    }

    // Weather code based alerts (WMO)
    if (typeof currentWeatherCode !== 'undefined') {
        const weatherCode = currentWeatherCode;
        if (weatherCode >= 95 && weatherCode <= 99) {
            alertsToDisplay.push(thunderstormAlert);
        } else if (weatherCode >= 45 && weatherCode <= 48) {
            alertsToDisplay.push(fogAlert);
        } else if (weatherCode >= 66 && weatherCode <= 67) {
            alertsToDisplay.push(hailAlert);
        } else if (weatherCode >= 71 && weatherCode <= 75) {
            alertsToDisplay.push(snowAlert);
        } else if (weatherCode === 3) {
            alertsToDisplay.push(fogAlert);
        } else if (weatherCode >= 85 && weatherCode <= 86) {
            alertsToDisplay.push(snowAlert);
        } else if (weatherCode >= 20 && weatherCode <= 29) {
            alertsToDisplay.push(thunderstormAlert);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {alertsToDisplay.length === 0 ? (
                <AlertTemplate
                    icon={<AlertTriangle size={24} color='#334155' />}
                    title="Sin alertas activas"
                    text="No se han detectado alertas meteorológicas para esta ubicación en este momento."
                    borderColor='#e2e8f0'
                    backgroundColor='#f8fafc'
                    titleColor='#334155'
                    textColor='#334155'
                />
            ) : (
                alertsToDisplay.map((alert, index) => (
                    <AlertTemplate key={index} {...alert} />
                ))
            )}
        </Box>
    );
}