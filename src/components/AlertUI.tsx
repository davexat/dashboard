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

export default function AlertUI() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
            <AlertTemplate {...thunderstormAlert}/>
            <AlertTemplate {...fogAlert}/>
            <AlertTemplate {...hailAlert}/>
            <AlertTemplate {...snowAlert}/>
            <AlertTemplate {...frostAlert}/>
            <AlertTemplate {...lowHumidityAlert}/>
            <AlertTemplate {...highPrecipitationProbAlert}/>
            <AlertTemplate {...uvAlert}/>
            <AlertTemplate {...rainAlert}/>
            <AlertTemplate {...windAlert}/>
            <AlertTemplate {...htAlert}/>
            <AlertTemplate {...ltAlert}/>
        </Box>
    )
}