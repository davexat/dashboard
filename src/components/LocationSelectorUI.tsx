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
import { InputAdornment } from '@mui/material';
import Title from './common/Title';

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
        <div style={{ padding: '1.5rem', width: '100%', background: '#fff', borderRadius: '1rem', boxShadow: '0 0.125rem 0.5rem rgba(0,0,0,0.08)', border: '0.0625rem solid #f3f4f6', boxSizing: 'border-box', display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <MapPin size={22} color='#1e40af' />
                <Title>Localización</Title>
            </div>
            <div style={{ position: "relative" }}>
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
                {error && (<div style={{ color: '#ef4444', marginTop: 0 }}>{error}</div>)}
                {locations && locations.length > 0 && isFocused && (
                    <Paper
                        sx={{ maxHeight: '12.5rem', overflowY: 'auto', position: 'absolute', zIndex: 1, textAlign: 'left', top: '3.75rem' }}>
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
            </div>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '0.5rem', border: '0.0625rem solid #bfdbfe', padding: '1rem', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start' }}>
                    <MapPin size={20} color='#1e40af' />
                    <Typography variant="subtitle1" component="p" color='#1e40af'>
                        Localización actual
                    </Typography>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <Typography variant="body1" component="p" color='#1e3a8a'>
                        {location.name}, {location.country}
                    </Typography>
                    <Typography variant="subtitle1" component="p" color='#2563eb'>
                        Latitud: {location.lat.toFixed(2)}, Longitud: {location.lon.toFixed(2)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
