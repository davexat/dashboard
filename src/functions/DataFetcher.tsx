import { useEffect, useState } from 'react';
import type { Location, OpenMeteoResponse, DataFetcherOutput } from '../types/DashboardTypes';

const CACHE_DURATION_MINUTES = 30;

function getCacheKey(city: Location): string {
    return `weather_${city.name.toLowerCase()}_${city.lat}_${city.lon}`;
}

export default function DataFetcher(city: Location) : DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=sunset,sunrise,uv_index_max,weather_code,temperature_2m_max,temperature_2m_min,rain_sum,precipitation_probability_max,wind_speed_10m_max,snowfall_sum&hourly=relative_humidity_2m,temperature_2m,wind_speed_10m,weather_code,precipitation_probability,precipitation,rain,snowfall,apparent_temperature&current=relative_humidity_2m,temperature_2m,wind_speed_10m,apparent_temperature,weather_code,precipitation,rain,showers,snowfall,cloud_cover&timezone=auto`;

        const cacheKey: string = getCacheKey(city);

        const fetchData = async () => {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                try {
                    const {timestamp, data: cachedData} = JSON.parse(cached);
                    const age = (Date.now() - timestamp) / 1000 / 60;
                    if (age < CACHE_DURATION_MINUTES) {
                        setData(cachedData);
                        setLoading(false);
                        return;
                    }
                } catch {}
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);

                localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result }));

            } catch (err: any) {
                if (cached) {
                    try {
                        const { data: cachedData } = JSON.parse(cached);
                        setData(cachedData);
                        setError("Error al obtener datos, mostrando datos en caché.");
                    } catch {
                        setError("Error al obtener datos y no hay caché disponible.");
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [city]);
    return { data, loading, error };
}
