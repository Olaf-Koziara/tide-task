export type CurrentWeather = {
  time: string
  temperature_2m: number
  rain: number
  precipitation: number
  wind_speed_10m: number
}

export type HourlyForecast = {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  wind_speed_10m: number[]
}

export type WeatherForecastResponse = {
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeather
  current_units: {
    time: string
    temperature_2m: string
    rain: string
    precipitation: string
    wind_speed_10m: string
  }
  hourly: HourlyForecast
  hourly_units: {
    time: string
    temperature_2m: string
    precipitation_probability: string
    wind_speed_10m: string
  }
}

export type WeatherData = {
  current: {
    temperature: number
    rain: number
    precipitation: number
    windSpeed: number
    time: string
  }
  hourly: Array<{
    time: string
    temperature: number
    precipitationProbability: number
    windSpeed: number
  }>
  units: {
    temperature: string
    precipitation: string
    windSpeed: string
  }
}

