import { useState, useEffect } from 'react';
import type { Locations } from '../types/LocationTypes';

interface Location {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface LocationSelectorUIProps {
    onLocationSelect: (location: Location) => void;
}

export default function LocationSelectorUI({ onLocationSelect }: LocationSelectorUIProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length < 3) {
            setResults([]);
            return;
        }

        setLoading(true);
        const timeout = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=jsonv2`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Error fetching locations:', error))
            .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(timeout);
        
    }, [searchTerm]);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading && <p>Cargando...</p>}
            {results.length > 0 && (
                <ul>
                    {results.map(location => (
                        <li key={location.place_id} onClick={() => onLocationSelect(location)}>
                            {location.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}