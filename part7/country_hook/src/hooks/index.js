import { useState, useEffect } from "react"
import axios from 'axios'

export const useCountry = (name) => {
    const restCountriesUrl = "https://restcountries.com/v3.1/all"
  
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        const getCountry = async () => {
            try {
                await axios
                    .get(restCountriesUrl)
                    .then(response => {
                        const data = response.data.map( ({ name, capital, area, languages, flags, population }) => 
                                                            ({
                                                                name: name.common
                                                                ,capital
                                                                ,area                            
                                                                ,languages
                                                                ,flags
                                                                ,population
                                                            }) 
                                                    ).find(country => 
                                                        (country.name.toLowerCase() === name.toLowerCase()))
                        if (data) {
                            setCountry({ data: data, found: true })
                        } else {
                            setCountry({ found: false })
                        }
                    })
                } catch (error) {
                    setCountry({ found: false })
                }
        }   
        if (name) {
            getCountry()
        }
    }, [name])
    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange
    }
  }