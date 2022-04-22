import { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom/client';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(res => {
      console.log(res.data)
      setCountries(res.data)
    })
  }, []);


  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filteredCountries =  countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
  console.log('length: ', filteredCountries.length)


  return (
    <div>
      <h1>Data For Countries</h1>
      <div>Find Countries: <input  value={filter} onChange={handleFilterChange} /></div>
      <Countries filteredCountries={filteredCountries}/>
    </div>
    )
}

const Countries = ( { filteredCountries }) => {
  
  const showCountry = (e, country) => {
    const div = document.getElementById(country.name.common)
    if(div.style.display === "none") div.style.display = "block"
    else div.style.display = "none"

    if(e.target.innerText === "Show") e.target.innerText = "Hide"
    else e.target.innerText = "Show"
  }
  if(filteredCountries.length === 1){
    let country = filteredCountries[0]
    return <Country country={country} />
  }
  if(filteredCountries.length > 10) {
    return <div>too many matches, specify another filter</div>
  }
  else {
    return <div>{filteredCountries.map(country =>
      <div>
        {country.name.common} <button onClick={(e) => showCountry(e,country)}>Show</button>
        <div id={country.name.common} style={{"display": "none"}}>
          <Country key={country.name.common} country={country} />
        </div>
        </div>)}
      </div>
  }
}

const Country = ({country}) => {
  return <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <strong>languages: </strong>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img alt="" src={country.flags.png} />
      <Weather country={country} />
    </div>
}

const Weather = ({ country}) => {
  const api = process.env.REACT_APP_API_KEY
  let [weatherData, setWeatherData] = useState({})
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}`)
      .then(res =>  setWeatherData(res.data))
  }, [country, api])

  return (
    <>
      <p>Weather in {country.capital} is {weatherData.weather[0].main}  </p>
      <p>Temp is {weatherData.main.temp} </p>
   </>
  )


  

}

export default App
