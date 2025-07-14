import Typography from '@mui/material/Typography';
import { CloudSun } from 'lucide-react';

export default function HeaderUI() {
    return (
        <div style={{ display: 'flex', gap: '30px', paddingLeft: '15px' }}>
            <CloudSun color="#fff" size={70} />
            <div style={{ textAlign: 'left' }}>
                <Typography variant="h4" component="h1" fontWeight="bold" color='#fff'>
                    Dashboard de Clima
                </Typography>
                <Typography variant="h6" component="h2" color='#fff'>
                    Información meteorológica actualizada
                </Typography>
            </div>
        </div>
    )
}
