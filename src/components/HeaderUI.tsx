import Typography from '@mui/material/Typography';
import { CloudSun } from 'lucide-react';
import { Container } from './common/UI';

export default function HeaderUI() {
    return (
        <Container style={{ background: "linear-gradient(90deg, #4A7BD3 0%, #3255A2 50%, #1A2C6B 100%)" }}>
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
        </Container>
    )
}
