import type { NormalizedSearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'

type Props = {
  query: string
  results: NormalizedSearchResult[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
}

export const CitySearchResults = ({
  query,
  results,
  isLoading,
  isError,
  errorMessage,
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
        <li key={city.placeId} className={styles['citySearch__result-item']}>
          <div className={styles['citySearch__result-title']}>{city.cityName}</div>
      
        </li>
      ))}
    </ul>
  )
}

export default CitySearchResults

