import { Route, Routes } from 'react-router-dom'
import './App.css'

import { CityList } from './components/CityList/CityList'
import { CitySearch } from './components/CitySearch/CitySearch'
import { WeatherForecast } from './components/WeatherForecast/WeatherForecast'

function App() {
  return (
    <>
      <main className="app">
        <CitySearch />
        <CityList />
      </main>
      <Routes>
        <Route path="/weather/:cityId" element={<WeatherForecast />} />
      </Routes>
    </>
  )
}

export default App
