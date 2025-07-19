import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { DataFetcherOutput } from '../types/Interfaces';
import { Thermometer } from 'lucide-react';

interface IndicatorUIProps {
    icon: React.ReactNode;
    type: string;
    indicator: string;
    borderColor: string;
    backgroundColor: string;
}

function IndicatorTemplate(indicator: IndicatorUIProps) {
    return (
        <Box sx={{
            gap: 2,
            borderRadius: 2,
            border: `1px solid ${indicator.borderColor}`,
            background: indicator.backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            transition: 'box-shadow 0.2s',
            '&:hover': {
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)',
            }
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {indicator.icon}
                <Typography variant='h6' component='h6' sx={{ textAlign: 'right', color: 'gray' }}>
                    {indicator.type.toUpperCase()}
                </Typography>
            </Box>
            <Typography variant='h5' component='h3' sx={{ textAlign: 'left', color: 'black' }}>
                {indicator.indicator}
            </Typography>
        </Box>
    )
}

export default function Indicator2UI({ data }: { data: DataFetcherOutput }) {
    const temperature = data.data?.current.temperature_2m;

    const indicatorProps: IndicatorUIProps = {
        icon: <Thermometer size={24} color='red' />,
        type: 'Temperatura',
        indicator: temperature !== undefined && temperature !== null ? temperature.toString() : "N/A",
        borderColor: "#f87171",
        backgroundColor: "#fee2e2"
    };

    return (
        <IndicatorTemplate {...indicatorProps} />
    );
}