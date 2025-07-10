import Typography from '@mui/material/Typography';
import { CloudSun } from 'lucide-react';

export default function HeaderUI() {
    return (
        <>
            <CloudSun color="#fff" size={45} />
            <Typography variant="h4" component="h1" fontWeight="bold" color='#fff'>
                Dashboard de Clima
            </Typography>
        </>
    )
}
