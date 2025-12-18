import { useQuery } from '@tanstack/react-query'
import { weatherService } from '../services/weatherService'
import type { WeatherData } from '../types/weather.types'

export const useWeatherForecast = (latitude: number, longitude: number) => {
  return useQuery<WeatherData>({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => weatherService.getForecast(latitude, longitude),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  })
}

