import styles from './WeatherForecast.module.css'

type Props = {
  time: string
  temperature: number
  precipitationProbability: number
  windSpeed: number
  temperatureUnit: string
  windUnit: string
}

export const HourlyForecastItem = ({
  time,
  temperature,
  precipitationProbability,
  windSpeed,
  temperatureUnit,
  windUnit,
}: Props) => {
  const formatTime = (isoTime: string) => {
    const date = new Date(isoTime)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    })
  }

  return (
    <div className={styles.hourlyItem}>
      <div className={styles.hourlyItem__time}>{formatTime(time)}</div>
      <div className={styles.hourlyItem__temp}>
        {Math.round(temperature)}{temperatureUnit}
      </div>
      <div className={styles.hourlyItem__details}>
        <div>💧 {precipitationProbability}%</div>
        <div>💨 {Math.round(windSpeed)} {windUnit}</div>
      </div>
    </div>
  )
}

