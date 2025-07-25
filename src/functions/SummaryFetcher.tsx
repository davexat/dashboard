import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import { CohereClientV2 } from 'cohere-ai';

interface SummaryFetcherOutput {
  summary: string | null;
  loading: boolean;
  error: string | null;
}

const cohere = new CohereClientV2({});

export default function SummaryFetcher(response: OpenMeteoResponse): SummaryFetcherOutput {
  const [summary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        await cohere.chat({
          model: 'command-a-03-2025',
          messages: [
            {
              role: 'user',
              content: `Por favor, resume la data: ${JSON.stringify(response)}`,
            },
          ],
        });

      } catch (err: any) {
        setError('Error al obtener el resumen.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [response]);
  return {summary, loading, error};
}
