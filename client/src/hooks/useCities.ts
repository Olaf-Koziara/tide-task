import { useQuery } from '@tanstack/react-query'
import { cityService } from '../services/cityService'
import type { City } from '../types/city.types'

const CITIES_QUERY_KEY = ['cities']

export const useCities = () => {
  return useQuery<City[]>({
    queryKey: CITIES_QUERY_KEY,
    queryFn: cityService.getAll,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

