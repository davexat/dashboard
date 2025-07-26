import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCohereWeatherResponse } from "../functions/SummaryFetcher";
import { Box, Typography, CircularProgress, Button, TextField } from '@mui/material';
import { Bot, MessageSquareText } from 'lucide-react';
import { Title, Container } from './common/UI';

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
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
        <Bot size={26} color='#1e40af' />
        <Title children="Asistente de Clima" />
      </div>

      {/* Input y botón */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Cómo estará el clima mañana?"
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleAsk}
          disabled={loading}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            minWidth: { xs: 'auto', sm: '120px' },
            backgroundColor: loading ? '#91a7e2' : '#4A7BD3',
            '&:hover': {
              backgroundColor: '#3255A2',
            },
            '&.Mui-disabled': {
              backgroundColor: '#91a7e2',
              color: '#ffffff',
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Consultar"}
        </Button>
      </Box>

      {response && (
        <Box
          sx={{
            background: '#effafdff',
            border: '1px solid #b2ebf2',
            p: 3,
            borderRadius: 2,
            fontSize: '0.9rem',
            color: '#023f6eff',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600, mb: 1 }}>
            <MessageSquareText size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Respuesta:
          </Typography>
          <p style={{ margin: 0, lineHeight: '1.6', fontSize: '1rem', fontFamily: 'Roboto, Arial, sans-serif', textAlign: 'left' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </p>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default WeatherAssistant;
