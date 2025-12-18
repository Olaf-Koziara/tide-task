import type { City, CreateCityDto, UpdateCityDto } from '../types/city.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4400'

class ApiError extends Error {
  status: number
  data?: unknown

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.message || 'Request failed',
      response.status,
      errorData
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  return handleResponse<T>(response)
}

export const cityService = {
  getAll: () => request<City[]>('/cities'),

  getById: (id: number) => request<City>(`/cities/${id}`),

  create: (data: CreateCityDto) =>
    request<City>('/cities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: UpdateCityDto) =>
    request<City>(`/cities/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<void>(`/cities/${id}`, {
      method: 'DELETE',
    }),
}

export { ApiError }

