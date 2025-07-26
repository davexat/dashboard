import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, Bar } from 'recharts';
import { Title, Container } from './common/UI';

interface DailyTemperatureProps {
    loading: boolean;
    error: string | null;
    maxTemperature: number[];
    minTemperature: number[];
    date: string[];
}

export function DailyTemperatureChart({ loading, error, maxTemperature, minTemperature, date }: DailyTemperatureProps) {
    if (loading) {
        return <div>Cargando datos...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const maxTemps = maxTemperature || [];
    const minTemps = minTemperature || [];
    const dates = date || [];

    const dailyData = dates.map((date, index) => ({
        date: new Date(date).toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
        }),
        maxTemp: maxTemps[index],
        minTemp: minTemps[index],
    }));

    return (
        <Container>
            <Title children='Temperaturas Diarias Semanales' />
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis 
                        dataKey="date"
                        stroke="#6b7280"
                        fontSize={12}
                    />
                    <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        label={{ value: 'Temperatura °C', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#1e293b',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="maxTemp"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Temperatura Máx"
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="minTemp"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Temperatura Mín"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
}

interface PrecipitationBarChartProps {
    loading: boolean;
    error: string | null;
    rainSum: number[];
    time: string[];
}

export function PrecipitationBarChart({ loading, error, rainSum, time }: PrecipitationBarChartProps) {
    if (loading) {
        return <div>Cargando datos...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const precipitation = rainSum || [];
    const dates = time || [];

    const chartData = dates.map((date, idx) => ({
        date: new Date(date).toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
        }),
        precipitation: precipitation[idx]
    }));

    return (
        <Container>
            <Title>Precipitación Diaria</Title>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} label={{ value: 'mm', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#1e293b',
                        }}
                    />
                    <Bar dataKey="precipitation" fill="#38bdf8" name="Precipitación" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    );
}

interface TodayTemperatureChartProps {
    loading: boolean;
    error: string | null;
    temperature: number[];
    apparentTemp: number[];
    time: string[];
}

export function TodayTemperatureChart({ loading, error, temperature, apparentTemp, time }: TodayTemperatureChartProps) {
    if (loading) {
        return <div>Cargando datos...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const temperatures = temperature || [];
    const apparent_temp = apparentTemp || [];
    const times = time || [];

    const today = new Date().toISOString().slice(0, 10);
    const chartData = times.map((time, idx) => ({
        time,
        temperature: temperatures[idx],
        apparent_temperature: apparent_temp[idx]
    })).filter(item => item.time.slice(0, 10) === today).map(item => ({
        time: new Date(item.time).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        temperature: item.temperature,
        apparent_temperature: item.apparent_temperature
    }));

    console.log(temperature);
    console.log(apparentTemp);

    return (
        <Container>
            <Title>Temperatura Horaria</Title>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#1e293b',
                        }}
                    />
                    <Line type="monotone" dataKey="temperature" name="Temperatura" stroke="#02aff9" />
                    <Line type="monotone" dataKey="apparent_temperature" name="Temperatura Aparente" stroke="#ff6a00" />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
}