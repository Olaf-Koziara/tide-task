import type { WeatherData, WeatherForecastResponse } from '../types/weather.types';

const WEATHER_API_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL ??'https://api.open-meteo.com/v1/forecast';

class WeatherApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WeatherApiError'
  }
}

const normalizeWeatherData = (response: WeatherForecastResponse): WeatherData => {
  const hourlyData = response.hourly.time.map((time, index) => ({
    time,
    temperature: response.hourly.temperature_2m[index],
    precipitationProbability: response.hourly.precipitation_probability[index],
    windSpeed: response.hourly.wind_speed_10m[index],
  }))

  return {
    current: {
      temperature: response.current.temperature_2m,
      rain: response.current.rain,
      precipitation: response.current.precipitation,
      windSpeed: response.current.wind_speed_10m,
      time: response.current.time,
    },
    hourly: hourlyData,
    units: {
      temperature: response.current_units.temperature_2m,
      precipitation: response.current_units.precipitation,
      windSpeed: response.current_units.wind_speed_10m,
    },
  }
}

export const weatherService = {
  getForecast: async (latitude: number, longitude: number): Promise<WeatherData> => {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,rain,precipitation,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,wind_speed_10m',
      forecast_days: '1',
    })

    const url = `${WEATHER_API_BASE_URL}?${params.toString()}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new WeatherApiError(`Failed to fetch weather data: ${response.statusText}`)
      }

      const data: WeatherForecastResponse = await response.json()
      return normalizeWeatherData(data)
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error
      }
      throw new WeatherApiError('Unable to fetch weather forecast')
    }
  },
}

export { WeatherApiError };

