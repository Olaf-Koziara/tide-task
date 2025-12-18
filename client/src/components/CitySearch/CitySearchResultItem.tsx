import type { NormalizedCitySearchResult } from '../../types/city.types'
import styles from './CitySearch.module.css'

type Props = {
  city: NormalizedCitySearchResult
  onAdd?: (city: NormalizedCitySearchResult) => void
}

export const CitySearchResultItem = ({ city, onAdd }: Props) => {
  return (
    <li className={styles['citySearch__result-item']}>
      <div className={styles['citySearch__result-title']}>{city.cityName}</div>
      <button
        type="button"
        className={styles['citySearch__add-button']}
        onClick={() => onAdd?.(city)}
        aria-label={`Add ${city.cityName}`}
      >
        +
      </button>
    </li>
  )
}

export default CitySearchResultItem

