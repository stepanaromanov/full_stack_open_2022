import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilters }) => {
    return (
      <div>
        <p>filter countries</p>
          <input value={newFilter}
                 onChange={handleFilters}
          />
      </div>
    )
}

const FullCountryInfo = ({ country }) => {
    const [temperatureC, setTemperatureC] = useState(0)
    const [icon, setIcon] = useState('')
    const [windspeed, setWindspeed] = useState(0)
    
    const kelvin_to_celsius = (kelvin) => {
        return kelvin - 273.15
    }

    const weather = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}
                                    &APPID=${process.env.REACT_APP_API_KEY}`)
                         .then(response => { 
                            setTemperatureC(kelvin_to_celsius(response.data.main.temp).toFixed(2))
                            setWindspeed(response.data.wind.speed)
                            setIcon(response.data.weather[0].icon)
                         })
 
    return (
        <div>
            <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <p>
                    <b>languages:</b>
                </p>
                <ul>
                    {Object
                        .values(country.languages)
                        .map(language => 
                                <li key={language}>
                                    {language}
                                </li>
                            )
                    }
                </ul>
                <img src={country.flags["png"]} />
            </div>
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature: {temperatureC} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                <p>wind: {windspeed} m/s</p>
            </div>
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [showCountry, setShowCountry] = useState({})

    const restCountriesUrl = "https://restcountries.com/v3.1/all"

    useEffect(() => {
        axios
            .get(restCountriesUrl)
            .then(response => {
                setCountries(response.data
                                .map( ({ name, capital, area, languages, flags }) => ({
                                            name: name.common
                                            ,capital
                                            ,area                            
                                            ,languages
                                            ,flags }) 
                                    )
                            )
            })
    }, [])

    const countriesToShow = countries.filter(country =>
                            country.name.toLowerCase()
                            .includes(newFilter.toLowerCase())
                            )

    const handleFilters = (event) => {
        setNewFilter(event.target.value)
        setShowCountry({})
    }

    const handleShows = (name) => {
        setShowCountry(countriesToShow.find(
            country => country.name === name))
    }

    return (
        <div>
            <Filter newFilter={newFilter} 
              handleFilters={handleFilters} />
            <div>
                { countriesToShow.length > 10 
                    && (<p>Too many matches, specify another filter</p>) }
                { countriesToShow.length <= 10 && countriesToShow.length > 1
                    && ( <ul>
                            { countriesToShow.map(country =>
                                <div key={country.name}>
                                    {country.name}  
                                    <button onClick=
                                        {() => handleShows(country.name)}>show
                                    </button>
                                </div>
                            )}
                        </ul> ) }
                { countriesToShow.length === 1 
                    && ( <FullCountryInfo country={countriesToShow[0]} /> )}
                { showCountry.name && <FullCountryInfo country={showCountry} />}
            </div>
        </div>
    )
}

export default App
