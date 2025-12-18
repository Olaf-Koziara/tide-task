import type { CitySearchResponse, CitySearchResult, NormalizedSearchResult } from '../types/city.types';

const BASE_URL = import.meta.env.VITE_SEARCH_BASE_ORIGIN;




const normalizeCity = (cityResult: CitySearchResult): NormalizedSearchResult => ({
  placeId: cityResult.properties.place_id ? String(cityResult.properties.place_id) : `${cityResult.properties.lat ?? ''}-${cityResult.properties.lon ?? ''}`,
  cityName: cityResult.properties.city
})

export const searchCities = async (
  city: string,
  signal?: AbortSignal,
): Promise<NormalizedSearchResult[]> => {
  const trimmed = city.trim()
  if (!trimmed) return []

  const url = `${BASE_URL}?text=${encodeURIComponent(trimmed)}&type=city&apiKey=${import.meta.env.VITE_SEARCH_API_KEY}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch city suggestions')
  }

  const data: CitySearchResponse = await response.json()
  
  return (data.features ?? []).map(normalizeCity).filter(city=>city.cityName)
}

