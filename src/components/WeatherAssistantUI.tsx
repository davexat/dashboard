// src/components/WeatherAssistant.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCohereWeatherResponse } from "../functions/coherenceAssistant";
import { Box, Typography, CircularProgress, Button, TextField } from '@mui/material';
import { Bot, MessageSquareText } from 'lucide-react';

interface WeatherAssistantProps {
  weatherData: any;
  weatherInfo: any;
}

const WeatherAssistant: React.FC<WeatherAssistantProps> = ({
  weatherData,
  weatherInfo,
}) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const fullPrompt = `
Usuario: ${query}
Datos actuales del clima:
- weatherData: ${JSON.stringify(weatherData)}
- weatherInfo: ${JSON.stringify(weatherInfo)}

Basado en estos datos, responde de forma amigable y clara.
`;

      const reply = await getCohereWeatherResponse(fullPrompt);
      setResponse(reply);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', md: '900px' }, // Adjust max-width for responsiveness
        mx: 'auto', // Center the box
        mt: 4, // Top margin
        px: 3, // Horizontal padding
        py: 3, // Vertical padding
        background: '#ffffff', // White background
        borderRadius: 3, // Rounded corners
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow
        transition: 'all 0.3s ease-in-out', // Smooth transitions
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)', // Slightly more pronounced shadow on hover
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Bot size={28} color="#4A7BD3" /> {/* An icon for the assistant */}
        <Typography variant="h5" component="h2" sx={{
          fontWeight: 600,
          color: '#334155', // Darker text for heading
        }}>
          Asistente del Clima
        </Typography>
      </Box>

      {/* Input y botón */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Cómo estará el clima mañana?"
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#f8fafc', // Light background for input
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#cbd5e1', // Light gray border
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#94a3b8', // Slightly darker border on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4A7BD3', // Blue focus border
              borderWidth: '2px',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAsk}
          disabled={loading}
          sx={{
            px: 3, // Padding horizontal
            py: 1.5, // Padding vertical
            borderRadius: 2,
            minWidth: { xs: 'auto', sm: '120px' }, // Responsive width for button
            backgroundColor: loading ? '#91a7e2' : '#4A7BD3', // Blue color, lighter when disabled
            '&:hover': {
              backgroundColor: '#3255A2', // Darker blue on hover
            },
            '&.Mui-disabled': {
              backgroundColor: '#91a7e2', // Lighter blue for disabled state
              color: '#ffffff', // White text
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Consultar"}
        </Button>
      </Box>

      {/* Respuesta */}
      {response && (
        <Box
          sx={{
            background: '#e0f2f7', // Light blue background
            border: '1px solid #b2ebf2', // Blue border
            p: 3, // Padding
            borderRadius: 2, // Rounded corners
            fontSize: '0.9rem',
            color: '#01579b', // Dark blue text
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600, mb: 1 }}>
            <MessageSquareText size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Respuesta:
          </Typography>
          <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default WeatherAssistant;
