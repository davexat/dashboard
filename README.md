# Weather Dashboard

## Description

Weather Dashboard is a modern web application that provides real-time and forecasted weather information for any location. Built with React, TypeScript, and Vite, it offers interactive charts, detailed indicators, weather alerts, and an AI-powered assistant for personalized weather insights. The dashboard is designed for clarity, accessibility, and a seamless user experience.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Location Search:** Find weather data for any city using OpenWeather geocoding.
- **Current Conditions:** View temperature, humidity, wind speed, UV index, sunrise, and sunset.
- **Daily & Hourly Forecasts:** Interactive tables and charts for temperature, precipitation, and more.
- **Weather Alerts:** Visual alerts for extreme weather events (storms, rain, snow, wind, etc.).
- **AI Weather Assistant:** Ask questions and get friendly, data-driven answers powered by Cohere AI.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Caching:** Fast data loading with local cache for recent queries.
- **Progressive Web App (PWA):** Installable and works offline with service worker and manifest support.

## Technologies Used

<a href="https://react.dev/">![Static Badge](https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&logoColor=white&labelColor=%2361DAFB)</a>
<a href="https://www.typescriptlang.org/">![Static Badge](https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript&logoColor=white&labelColor=%233178C6)</a>
<a href="https://vitejs.dev/">![Static Badge](https://img.shields.io/badge/Vite-black?style=for-the-badge&logo=vite&logoColor=white&labelColor=%23646CFF)</a>
<a href="https://mui.com/">![Static Badge](https://img.shields.io/badge/MUI-black?style=for-the-badge&logo=mui&logoColor=white&labelColor=%23007FFF)</a>
<a href="https://recharts.org/">![Static Badge](https://img.shields.io/badge/Recharts-FF7300?style=for-the-badge&logo=recharts&logoColor=white)</a>
<a href="https://cohere.com/">![Static Badge](https://img.shields.io/badge/Cohere%20AI-000000?style=for-the-badge&logo=cohere&logoColor=white)</a>
<a href="https://open-meteo.com/">![Static Badge](https://img.shields.io/badge/OpenMeteo-00BFFF?style=for-the-badge&logoColor=white)</a>
<a href="https://openweathermap.org/">![Static Badge](https://img.shields.io/badge/OpenWeatherMap-FA9E1B?style=for-the-badge&logo=openweathermap&logoColor=white)</a>

## Project Structure

```
dashboard/
├── public/                           # Static assets (icons, manifest, etc.)
├── src/
│   ├── App.tsx                       # Main app component
│   ├── index.html                    # Entry HTML
│   ├── main.tsx                      # App entry point
│   ├── components/                   # UI components
│   │   ├── AlertUI.tsx               # Weather alerts
│   │   ├── ChartUI.tsx               # Charts for precipitation & temperature
│   │   ├── HeaderUI.tsx              # App header
│   │   ├── IndicatorUI.tsx           # Current weather indicators
│   │   ├── InsightUI.tsx             # Weather tips & insights
│   │   ├── LocationSelectorUI.tsx    # Location search & selection
│   │   ├── TableUI.tsx               # Hourly forecast table
│   │   ├── WeatherAssistantUI.tsx    # AI assistant
│   │   └── common/                   # Shared UI elements
│   ├── functions/                    # Data fetching & API logic
│   │   ├── DataFetcher.tsx           # Weather data fetcher
│   │   ├── LocationFetcher.tsx       # Location geocoding
│   │   └── SummaryFetcher.tsx        # AI summary fetcher
│   ├── types/                        # TypeScript types
│   │   └── DashboardTypes.tsx        # Data models
│   ├── App.css                       # App styles
│   └── index.css                     # Global styles
├── LICENSE                           # MIT License
├── package.json                      # Project dependencies & scripts
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite config
├── README.md                         # This README file
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/davexat/dashboard.git
   cd dashboard
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file and add your API keys:
     ```env
     VITE_GEOCODING_API_KEY=your_openweather_api_key
     VITE_COHERE_API_KEY=your_cohere_api_key
     ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Search for a city and explore weather data, charts, and insights.
- Use the AI assistant to ask questions about the weather.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
