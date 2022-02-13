import { useState } from 'react'
import './styles/app.css'
import SortTable from './pages/SortTable'
import Landing from './pages/Landing'
import ColorManager from './pages/ColorManager'
import Fighter from './pages/Fighter'
import BuildClass from './pages/BuildClass'
import Calculator from './pages/Calculator'

function App() {
  const [route, setRoute] = useState(window.location.pathname)

  switch(route) {
    case "/":
      return <Landing />
    case "/sort":
      return <SortTable />
    case "/color":
      return <ColorManager />
    case "/fight":
      return <Fighter />
    case "/build":
      return <BuildClass />
    case "/calculator":
      return <Calculator />
  }
  return (
    <div>{route}</div>
  )
}

export default App
