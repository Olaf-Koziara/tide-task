import './App.css'

import { CitySearch } from './components/CitySearch/CitySearch'
import { CityList } from './components/CityList/CityList'

function App() {
  return (
    <main className="app">
      <CitySearch />
      <CityList />
    </main>
  )
}

export default App
