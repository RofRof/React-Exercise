import '../styles/landing.css'

function Landing() {
  return(
    <div className="landing">
      <ul>
        <li onClick={() => window.location.pathname ="/calculator"}>Calculator</li>
        <li onClick={() => window.location.pathname ="/build"}>Build Class Module</li>
        <li onClick={() => window.location.pathname ="/fight"}>Fighter</li>
        <li onClick={() => window.location.pathname = "/color"}>Color Manager</li>
        <li onClick={() => window.location.pathname = "/sort"}>Sort Table Excercise</li>
      </ul>
    </div>
  )
}

export default Landing