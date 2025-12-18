import type { WeatherData } from '../../types/weather.types'
import styles from './WeatherForecast.module.css'

type Props = {
  weather: WeatherData['current']
  units: WeatherData['units']
}

export const WeatherCard = ({ weather, units }: Props) => {
  const getWeatherCondition = () => {
    if (weather.rain > 0) return 'Rainy'
    if (weather.precipitation > 0) return 'Precipitation'
    return 'Clear'
  }

  return (
    <div className={styles.weatherCard}>
      <h3 className={styles.weatherCard__title}>Current Weather</h3>
      <div className={styles.weatherCard__temperature}>
        {Math.round(weather.temperature)}{units.temperature}
      </div>
      <div className={styles.weatherCard__details}>
        <div className={styles.weatherCard__detail}>
          <span className={styles.weatherCard__detailLabel}>Condition</span>
          <span className={styles.weatherCard__detailValue}>{getWeatherCondition()}</span>
        </div>
        <div className={styles.weatherCard__detail}>
          <span className={styles.weatherCard__detailLabel}>Wind</span>
          <span className={styles.weatherCard__detailValue}>
            {weather.windSpeed} {units.windSpeed}
          </span>
        </div>
        <div className={styles.weatherCard__detail}>
          <span className={styles.weatherCard__detailLabel}>Rain</span>
          <span className={styles.weatherCard__detailValue}>
            {weather.rain} {units.precipitation}
          </span>
        </div>
      </div>
    </div>
  )
}

