import { useState } from 'react'

import { useCityMutations } from '../../hooks/useCityMutations'
import { useCitySearch } from '../../hooks/useCitySearch'
import type { NormalizedCitySearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'
import { CitySearchResults } from './CitySearchResults'

const MIN_QUERY_LENGTH = 2

export const CitySearch = () => {
  const [query, setQuery] = useState('')
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useCitySearch(query, MIN_QUERY_LENGTH)

  const { createCity } = useCityMutations()

  const handleAddCity = (city: NormalizedCitySearchResult) => {
    if (!city.cityName) return

    createCity.mutate(
      { name: city.cityName },
      {
        onSuccess: () => {
          console.log(`✓ Added "${city.cityName}" to your list`)
        },
        onError: (error) => {
          console.error('Failed to add city:', error)
        },
      }
    )
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
            minLength={MIN_QUERY_LENGTH}
          />
         
        </div>
      </form>

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

