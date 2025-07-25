import { useState, useEffect } from 'react';
import type { Location } from '../types/DashboardTypes';

interface LocationFetcherOutput {
    locations: Location[] | null;
    loading: boolean;
    error: string | null;
}

export default function LocationFetcher(city: string): LocationFetcherOutput {
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${import.meta.env.VITE_GEOCODING_API_KEY}`;

        const fetchLocations = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: Location[] = await response.json();
                const formatted = result.map(loc => ({
                    ...loc,
                    lat: Number(loc.lat.toFixed(4)),
                    lon: Number(loc.lon.toFixed(4))
                }));
                setLocations(formatted);

            } catch (err: any) {
                setError('Error al obtener ubicaciones.');
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, [city]);
    return {locations, loading, error};
}
    