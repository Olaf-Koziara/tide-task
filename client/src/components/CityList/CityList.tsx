import { useCities } from '../../hooks/useCities'
import { useCityMutations } from '../../hooks/useCityMutations'
import styles from './CityList.module.css'
import { CityListItem } from './CityListItem'

export const CityList = () => {
  const { data: cities, isLoading, isError, error } = useCities()
  const { updateCity, deleteCity } = useCityMutations()

  const handleUpdate = (id: number, name: string) => {
    updateCity.mutate({ id, data: { name } })
  }

  const handleDelete = (id: number) => {
    deleteCity.mutate(id)
  }

  if (isLoading) {
    return (
      <section className={styles.cityList}>
        <h2 className={styles.cityList__title}>Your Cities</h2>
        <p className={styles.cityList__message}>Loading cities...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className={styles.cityList}>
        <h2 className={styles.cityList__title}>Your Cities</h2>
        <p className={styles.cityList__error}>
          Failed to load cities. {error instanceof Error ? error.message : 'Try again.'}
        </p>
      </section>
    )
  }

  if (!cities?.length) {
    return (
      <section className={styles.cityList}>
        <h2 className={styles.cityList__title}>Your Cities</h2>
        <p className={styles.cityList__message}>No cities saved yet. Search and add some cities above!</p>
      </section>
    )
  }

  return (
    
    <section className={styles.cityList}>
      <h2 className={styles.cityList__title}>Your Cities ({cities.length})</h2>
      <div className={styles.cityList__wrapper}>
      <ul className={styles.cityList__items}>
        {cities.map((city) => (
          <CityListItem
            key={city.id}
            city={city}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isUpdating={updateCity.isPending}
            isDeleting={deleteCity.isPending}
          />
        ))}
      </ul>
      </div>
    </section>

  )
}

export default CityList

