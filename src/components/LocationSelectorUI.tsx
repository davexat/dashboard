import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { Location } from '../types/DashboardTypes';
import LocationFetcher from '../functions/LocationFetcher';
import { DEFAULT_LOCATION } from '../App';
import Container from '@mui/material/Container';

export default function LocationSelectorUI({ onLocationSelect }: { onLocationSelect: (location: Location) => void }) {
    const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
    const [cityInput, setCityInput] = useState('');
    const [search, setSearch] = useState(DEFAULT_LOCATION.name);
    const [isFocused, setIsFocused] = useState(false);

    const { locations, loading, error } = LocationFetcher(search);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
    };

    const handleLocationSelect = (loc: Location) => {
        setLocation(loc);
        setCityInput(loc.name);
        setIsFocused(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (cityInput.trim() !== '') {
                setSearch(cityInput);
            }
        }, 1000);
        return () => clearTimeout(handler);
    }, [cityInput]);

    return (
        <Box sx={{ textAlign: 'left' }}>
            <Box display="flex" alignItems={'center'} gap={1} position="relative" padding={2} sx={{ justifyContent: 'flex-start' }}>
                <MapPin size={22} color='#1e40af' />
                <Typography variant="h5" component="h6" color='#000' sx={{ textAlign: 'left' }}>
                    Localización
                </Typography>
            </Box>
            <Box display="flex" gap={1} position="relative" padding={2} sx={{ justifyContent: 'flex-start' }}>
                <TextField
                    label="Buscar ubicación"
                    variant="outlined"
                    fullWidth
                    value={cityInput}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
            </Box>
            {loading && (<CircularProgress size={24} sx={{ mt: 2 }} />)}
            {error && (<Box color="error.main" mt={2}>{error}</Box>)}
            {locations && locations.length > 0 && isFocused && (
                <Paper
                    sx={{ mt: 2, maxHeight: 200, overflowY: 'auto', position: 'absolute', zIndex: 1, textAlign: 'left' }}>
                    <List dense>
                        {locations.map((loc) => (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleLocationSelect(loc)}>
                                    <ListItemText
                                        primary={loc.name}
                                        secondary={`Lat: ${loc.lat}, Lon: ${loc.lon}, Country: ${loc.country}${loc.state ? `, State: ${loc.state}` : ''}`}
                                        sx={{ textAlign: 'left' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
            <Box sx={{ backgroundColor: '#eff6ff', borderRadius: 1 , border: '1px solid #bfdbfe', padding: 1, gap: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%' }}>
                <Container sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
                    <MapPin size={20} color='#1e40af' />
                    <Typography variant="subtitle1" component="p" color='#1e40af'>
                        Localización actual
                    </Typography>
                </Container>
                <Container sx={{ textAlign: 'left'}}>
                        <Typography variant="body1" component="p" color='#1e3a8a'>
                        {location.name}, {location.country}
                    </Typography>
                    <Typography variant="subtitle1" component="p" color='#2563eb'>
                        Latitud: {location.lat.toFixed(2)}, Longitud: {location.lon.toFixed(2)}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
