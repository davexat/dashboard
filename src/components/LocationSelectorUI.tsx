import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import type { Location } from '../types/DashboardTypes';
import LocationFetcher from '../functions/LocationFetcher';

export default function LocationSelectorUI({ onLocationSelect }: { onLocationSelect: (location: Location) => void }) {
    const [cityInput, setCityInput] = useState('');
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const { locations, loading, error } = LocationFetcher(search);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(cityInput);
        }, 1000);
        return () => clearTimeout(handler);
    }, [cityInput]);

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={1} position="relative">
                <TextField
                    label="Buscar ubicación"
                    variant="outlined"
                    fullWidth
                    value={cityInput}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </Box>
            {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            {error && <Box color="error.main" mt={2}>{error}</Box>}
            {locations && locations.length > 0 && isFocused && (
                <Paper
                    sx={{ mt: 2, maxHeight: 200, overflowY: 'auto', position: 'absolute', zIndex: 1}}>
                    <List dense>
                        {locations.map((loc) => (
                            <ListItem key={loc.place_id} disablePadding>
                                <ListItemButton onClick={() => onLocationSelect(loc)}>
                                    <ListItemText
                                        primary={loc.display_name}
                                        secondary={`Lat: ${loc.lat}, Lon: ${loc.lon}, Tipo: ${loc.addresstype}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}
