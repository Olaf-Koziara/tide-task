import { useState } from 'react'
import type { City } from '../../types/city.types'
import styles from './CityList.module.css'

type Props = {
  city: City
  onUpdate: (id: number, name: string) => void
  onDelete: (id: number) => void
  isUpdating: boolean
  isDeleting: boolean
}

export const CityListItem = ({ city, onUpdate, onDelete, isUpdating, isDeleting }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(city.name)

  const handleSave = () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== city.name) {
      onUpdate(city.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(city.name)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <li className={styles.cityList__item}>
      {isEditing ? (
        <div className={styles.cityList__editMode}>
          <input
            type="text"
            className={styles.cityList__input}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isUpdating}
          />
          <div className={styles.cityList__editActions}>
            <button
              type="button"
              className={`${styles.cityList__button} ${styles['cityList__button--save']}`}
              onClick={handleSave}
              disabled={isUpdating || !editValue.trim()}
            >
              ✓
            </button>
            <button
              type="button"
              className={`${styles.cityList__button} ${styles['cityList__button--cancel']}`}
              onClick={handleCancel}
              disabled={isUpdating}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.cityList__content}>
            <span className={styles.cityList__name}>{city.name}</span>
            <span className={styles.cityList__date}>
              {new Date(city.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.cityList__actions}>
            <button
              type="button"
              className={`${styles.cityList__button} ${styles['cityList__button--edit']}`}
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              aria-label={`Edit ${city.name}`}
            >
              ✎
            </button>
            <button
              type="button"
              className={`${styles.cityList__button} ${styles['cityList__button--delete']}`}
              onClick={() => onDelete(city.id)}
              disabled={isDeleting}
              aria-label={`Delete ${city.name}`}
            >
              🗑
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default CityListItem

