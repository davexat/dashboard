import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
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
import { InputAdornment } from '@mui/material';

export default function LocationSelectorUI(
    { onLocationSelect }: { onLocationSelect: (location: Location) => void }
) {
    const [location, setLocation]   = useState<Location>(DEFAULT_LOCATION);
    const [cityInput, setCityInput] = useState<string>('');
    const [search, setSearch]       = useState<string>(DEFAULT_LOCATION.name);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { locations, loading, error } = LocationFetcher(search);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
    };

    const handleLocationSelect = (loc: Location) => {
        onLocationSelect(loc);
        setLocation(loc);
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
        <Container disableGutters sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
            <Container disableGutters sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin size={22} color='#1e40af' />
                <Typography variant="h5" component="h6" color='#000' sx={{ textAlign: 'left' }}>
                    Localización
                </Typography>
            </Container>
            <Container disableGutters sx={{ position: "relative" }}>
                <TextField
                    label="Buscar ubicación"
                    variant="outlined"
                    fullWidth
                    value={cityInput}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="off"
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position='end'>
                                {loading && (<CircularProgress size={24}/>)}
                            </InputAdornment>
                        }
                    }}
                    
                />
                {error && (<Container sx={{ color: "error.main", mt: 0 }}>{error}</Container>)}
                {locations && locations.length > 0 && isFocused && (
                    <Paper
                        sx={{ maxHeight: 200, overflowY: 'auto', position: 'absolute', zIndex: 1, textAlign: 'left', top: 60 }}>
                        <List dense>
                            {locations.map((loc) => (
                                <ListItem key={`${loc.name}${loc.lat}${loc.lon}`} disablePadding>
                                    <ListItemButton onClick={() => handleLocationSelect(loc) }>
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
            </Container>
            <Container disableGutters sx={{ backgroundColor: '#eff6ff', borderRadius: 1, border: '1px solid #bfdbfe', padding: 2, gap: 1, display: 'flex', flexDirection: 'column' }}>
                <Container disableGutters sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
                    <MapPin size={20} color='#1e40af' />
                    <Typography variant="subtitle1" component="p" color='#1e40af'>
                        Localización actual
                    </Typography>
                </Container>
                <Container disableGutters sx={{ textAlign: 'left' }}>
                    <Typography variant="body1" component="p" color='#1e3a8a'>
                        {location.name}, {location.country}
                    </Typography>
                    <Typography variant="subtitle1" component="p" color='#2563eb'>
                        Latitud: {location.lat.toFixed(2)}, Longitud: {location.lon.toFixed(2)}
                    </Typography>
                </Container>
            </Container>

        </Container>
    );
}
