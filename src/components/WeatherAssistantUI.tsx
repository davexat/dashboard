// src/components/WeatherAssistant.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCohereWeatherResponse } from "../functions/coherenceAssistant";

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
    <div className="max-w-3xl min-w-2xl mx-auto mt-10 px-6 ">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Asistente del Clima
          </h2>
        </div>

        {/* Input y botón */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Cómo estará el clima mañana?"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Consultando…" : "Consultar"}
          </button>
        </div>

        {/* Respuesta */}
        {response && (
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-4 rounded-lg text-sm text-blue-900 dark:text-blue-100 transition-all">
            <p className="font-semibold mb-1">Respuesta:</p>
            <div className="whitespace-pre-line">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 dark:text-red-400 mt-4 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAssistant;
