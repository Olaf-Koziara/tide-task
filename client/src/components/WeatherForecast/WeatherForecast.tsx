import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useWeatherForecast } from '../../hooks/useWeatherForecast'
import { HourlyForecastItem } from './HourlyForecastItem'
import { WeatherCard } from './WeatherCard'
import styles from './WeatherForecast.module.css'

type LocationState = {
  latitude: number
  longitude: number
  name: string
}

export const WeatherForecast = () => {
  const navigate = useNavigate()
  const { cityId } = useParams<{ cityId: string }>()
  const location = useLocation()
  const state = location.state as LocationState | null

  const { data, isLoading, isError, error } = useWeatherForecast(
    state?.latitude ?? 0,
    state?.longitude ?? 0
  )

  const handleClose = () => {
    navigate('/')
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (!state) {
    return (
      <div className={styles.weatherOverlay} onClick={handleClose}>
        <div className={styles.weatherModal} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.weatherModal__close}
            onClick={handleClose}
            aria-label="Close weather forecast"
          >
            ✕
          </button>
          <div className={styles.weatherModal__error}>
            <p>No city data available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.weatherOverlay} onClick={handleClose}>
      <div className={styles.weatherModal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.weatherModal__close}
          onClick={handleClose}
          aria-label="Close weather forecast"
        >
          ✕
        </button>

        <header className={styles.weatherModal__header}>
          <h2 className={styles.weatherModal__cityName}>{state.name}</h2>
          <p className={styles.weatherModal__subtitle}>
            {state.latitude.toFixed(2)}°N, {state.longitude.toFixed(2)}°E
          </p>
        </header>

        <div className={styles.weatherModal__content}>
          {isLoading && (
            <div className={styles.weatherModal__loading}>
              <div className={styles.weatherModal__spinner} />
              <p>Loading weather data...</p>
            </div>
          )}

          {isError && (
            <div className={styles.weatherModal__error}>
              <p>Failed to load weather forecast</p>
              {error instanceof Error && <p>{error.message}</p>}
            </div>
          )}

          {data && (
            <>
              <WeatherCard weather={data.current} units={data.units} />

              <div className={styles.hourlyForecast}>
                <h3 className={styles.hourlyForecast__title}>24-Hour Forecast</h3>
                <div className={styles.hourlyForecast__list}>
                  {data.hourly.map((hour, index) => (
                    <HourlyForecastItem
                      key={`${hour.time}-${index}`}
                      time={hour.time}
                      temperature={hour.temperature}
                      precipitationProbability={hour.precipitationProbability}
                      windSpeed={hour.windSpeed}
                      temperatureUnit={data.units.temperature}
                      windUnit={data.units.windSpeed}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

