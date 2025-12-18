import { useEffect, useState } from 'react'

import { useCityMutations } from '../../hooks/useCityMutations'
import { useCitySearch } from '../../hooks/useCitySearch'
import { ApiError } from '../../services/cityService'
import type { NormalizedCitySearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'
import CitySearchResults from './CitySearchResults'

const MIN_QUERY_LENGTH = 2
const CitySearch = () => {
  const [query, setQuery] = useState('')
  const [lastAddedCity, setLastAddedCity] = useState<string | null>(null)
  
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
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [createCity.isSuccess, lastAddedCity, createCity])

  const handleAddCity = (city: NormalizedCitySearchResult) => {
    if (!city.cityName) return

    setLastAddedCity(city.cityName)
    createCity.mutate({ 
      name: city.cityName,
      latitude: city.lat,
      longitude: city.lon
    })
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

  const getSuccessMessage = () => {
    if (!createCity.isSuccess || !lastAddedCity) return null
    return `✓ Added "${lastAddedCity}" to your list`
  }


  return (
    <section className={styles.citySearch}>
      <header className={styles.citySearch__header}>
        <h2 className={styles.citySearch__title}>City Search</h2>

      </header>

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
            onChange={(event) => setQuery(event.target.value)}
          />
         
        </div>
      </form>

     

      {createCity.isSuccess && getSuccessMessage() && (
        <div className={styles.citySearch__addSuccess}>
          {getSuccessMessage()}
        </div>
      )}

      {createCity.isError && getErrorMessage() && (
        <div className={styles.citySearch__addError}>
          {getErrorMessage()}
        </div>
      )}

      <CitySearchResults
        query={query}
        results={data ?? []}
        isLoading={isLoading || isFetching}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        onAddCity={handleAddCity}
      />
    </section>
  )
}

export default CitySearch

