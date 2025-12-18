import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { searchCities } from '../services/externalCityService'
import type { NormalizedCitySearchResult } from '../types/city.types'

const DEBOUNCE_MS = 300

export const useCitySearch = (query: string, minLength = 1) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(handle)
  }, [query])

  const trimmedQuery = debouncedQuery.trim()

  return useQuery<NormalizedCitySearchResult[]>({
    queryKey: ['city-search', trimmedQuery],
    queryFn: ({ signal }) => searchCities(trimmedQuery, signal),
    enabled: trimmedQuery.length >= minLength,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

