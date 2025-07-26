export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Currentunits;
  current: Current;
  hourly_units: Hourlyunits;
  hourly: Hourly;
  daily_units: Dailyunits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  sunset: string[];
  sunrise: string[];
  uv_index_max: number[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  rain_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  snowfall_sum: number[];
}

export interface Dailyunits {
  time: string;
  sunset: string;
  sunrise: string;
  uv_index_max: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  rain_sum: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
  snowfall_sum: string;
}

export interface Hourly {
  time: string[];
  relative_humidity_2m: number[];
  temperature_2m: number[];
  wind_speed_10m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  snowfall: number[];
  apparent_temperature: number[];
}

export interface Hourlyunits {
  time: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  wind_speed_10m: string;
  weather_code: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  snowfall: string;
  apparent_temperature: string;
}

export interface Current {
  time: string;
  interval: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  wind_speed_10m: number;
  apparent_temperature: number;
  weather_code: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  cloud_cover: number;
}

export interface Currentunits {
  time: string;
  interval: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  wind_speed_10m: string;
  apparent_temperature: string;
  weather_code: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  cloud_cover: string;
}

export interface Location {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
