import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cityService } from '../services/cityService'
import type { City, CreateCityDto, UpdateCityDto } from '../types/city.types'

const CITIES_QUERY_KEY = ['cities']

export const useCityMutations = () => {
  const queryClient = useQueryClient()

  const createCity = useMutation({
    mutationFn: (data: CreateCityDto) => cityService.create(data),
    onSuccess: (newCity) => {
      queryClient.setQueryData<City[]>(CITIES_QUERY_KEY, (old = []) => [
        ...old,
        newCity,
      ])
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: CITIES_QUERY_KEY })
    },
  })

  const updateCity = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCityDto }) =>
      cityService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: CITIES_QUERY_KEY })

      const previous = queryClient.getQueryData<City[]>(CITIES_QUERY_KEY)

      queryClient.setQueryData<City[]>(CITIES_QUERY_KEY, (old = []) =>
        old.map((city) =>
          city.id === id ? { ...city, name: data.name, updatedAt: new Date().toISOString() } : city
        )
      )

      return { previous }
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CITIES_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CITIES_QUERY_KEY })
    },
  })

  const deleteCity = useMutation({
    mutationFn: (id: number) => cityService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CITIES_QUERY_KEY })

      const previous = queryClient.getQueryData<City[]>(CITIES_QUERY_KEY)

      queryClient.setQueryData<City[]>(CITIES_QUERY_KEY, (old = []) =>
        old.filter((city) => city.id !== id)
      )

      return { previous }
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CITIES_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CITIES_QUERY_KEY })
    },
  })

  return {
    createCity,
    updateCity,
    deleteCity,
  }
}

