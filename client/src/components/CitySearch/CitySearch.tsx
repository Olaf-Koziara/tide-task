import { useEffect, useState } from 'react'
import { z } from 'zod'

import { useCityMutations } from '../../hooks/useCityMutations'
import { useCitySearch } from '../../hooks/useCitySearch'
import { ApiError } from '../../services/cityService'
import type { NormalizedCitySearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'
import CitySearchResults from './CitySearchResults'

const MIN_QUERY_LENGTH = 3

const searchQuerySchema = z.object({
  query: z.string().min(MIN_QUERY_LENGTH, {
    message: `Search query must be at least ${MIN_QUERY_LENGTH} characters`
  })
})
const CitySearch = () => {
  const [query, setQuery] = useState('')
  const [lastAddedCity, setLastAddedCity] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useCitySearch(query, MIN_QUERY_LENGTH)

  const { createCity } = useCityMutations()

  useEffect(() => {
    if (createCity.isSuccess && lastAddedCity) {
      const timer = setTimeout(() => {
        createCity.reset()
        setLastAddedCity(null)
      }, 500)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCity.isSuccess, lastAddedCity])

  const handleAddCity = (city: NormalizedCitySearchResult) => {
    if (!city.cityName) return

    setLastAddedCity(city.cityName)
    createCity.mutate({ 
      name: city.cityName,
      latitude: city.lat,
      longitude: city.lon
    }, {
      onSuccess: () => {
        resetQuery();
        setValidationError(null)
      }
    })
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    
    if (value.length > 0) {
      const result = searchQuerySchema.safeParse({ query: value })
      if (!result.success) {
        setValidationError(result.error.issues[0].message)
      } else {
        setValidationError(null)
      }
    } else {
      setValidationError(null)
    }
  }
  const resetQuery = ()=>{
    setQuery('');
  }

  const getErrorMessage = () => {
    if (!createCity.error || !lastAddedCity) return null

    const error = createCity.error
    const isDuplicateError = 
      error instanceof ApiError && 
      (error.status === 409 || 
       (error.data as { error?: string })?.error === 'DUPLICATE_CITY')
    
    if (isDuplicateError) {
      return `"${lastAddedCity}" is already in your list`
    }
    return `Failed to add "${lastAddedCity}". Please try again.`
  }


  const errorMessage = getErrorMessage()

  return (
    <section className={styles.citySearch}>
      <header className={styles.citySearch__header}>
        <h2 className={styles.citySearch__title}>City Search</h2>

      </header>

      <div className={styles.citySearch__searchContainer}>
        <form className={styles.citySearch__form}>
          <label className={styles.citySearch__label} htmlFor="city">
            City name
          </label>
          <div className={styles.citySearch__controls}>
            <input
              id="city"
              name="city"
              className={styles.citySearch__input}
              placeholder="e.g. Paris"
              value={query}
              autoComplete="off"
              onChange={(event) => handleQueryChange(event.target.value)}
            />
          {query.length>2&& <button 
              type="button"
              className={styles.citySearch__resetButton}
              onClick={resetQuery}
            >
              ✕
            </button>}
          </div>
        </form>

        {validationError && (
          <div className={styles.citySearch__validationError}>
            {validationError}
          </div>
        )}



      {errorMessage && (
        <div className={styles.citySearch__addError}>
          {errorMessage}
        </div>
      )}
      {!errorMessage && !validationError && query.length>2 &&
    <div className={styles.citySearch__dropdown}>
      <CitySearchResults
        query={query}
        results={data ?? []}
        isLoading={isLoading || isFetching}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        onAddCity={handleAddCity}
      />
      </div>
}
      </div>
    </section>
  )
}

export default CitySearch

