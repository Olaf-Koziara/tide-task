import type { NormalizedCitySearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'
import CitySearchResultItem from './CitySearchResultItem'

type Props = {
  query: string
  results: NormalizedCitySearchResult[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onAddCity?: (city: NormalizedCitySearchResult) => void
}

const CitySearchResults = ({
  query,
  results,
  isLoading,
  isError,
  errorMessage,
  onAddCity,
}: Props) => {
  const trimmed = query.trim()

  if (!trimmed) {
    return <p className={styles.citySearch__helper}>Start typing to search for a city.</p>
  }

  if (isLoading) {
    return <p className={styles.citySearch__helper}>Searching for "{trimmed}"…</p>
  }

  if (isError) {
    return (
      <p className={styles.citySearch__error}>
        Unable to fetch cities. {errorMessage ? `(${errorMessage})` : 'Try again.'}
      </p>
    )
  }

  if (!results.length) {
    return <p className={styles.citySearch__helper}>No results for "{trimmed}".</p>
  }

  return (
    <ul className={styles.citySearch__results}>
      {results.map((city) => (
        <CitySearchResultItem key={city.placeId} city={city} onAdd={onAddCity} />
      ))}
    </ul>
  )
}

export default CitySearchResults

