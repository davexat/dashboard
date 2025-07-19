// src/api/cohereAssistant.ts

let apiCallCount = 0;
const MAX_CALLS_PER_MINUTE = 15;
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
let lastCallTimestamp = Date.now();

export async function getCohereWeatherResponse(userQuery: string): Promise<string> {
  const now = Date.now();

  if (apiCallCount >= MAX_CALLS_PER_MINUTE && now - lastCallTimestamp < 60000) {
    throw new Error("Límite de llamadas alcanzado. Intenta en un momento.");
  }

  if (now - lastCallTimestamp > 60000) {
    apiCallCount = 0;
    lastCallTimestamp = now;
  }

  apiCallCount++;

  const response = await fetch("https://api.cohere.com/v2/chat", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${COHERE_API_KEY}`, // Reemplaza esto con tu API Key segura
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stream: false,
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: userQuery,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error Cohere: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  const content = data.message?.content
    ?.filter((part: any) => part.type === "text")
    ?.map((part: any) => part.text)
    ?.join("\n");

  return content ?? "No se obtuvo respuesta del asistente.";
}
