import { useState } from 'react'

import { useCitySearch } from '../../hooks/useCitySearch'
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
      />
    </section>
  )
}

export default CitySearch

