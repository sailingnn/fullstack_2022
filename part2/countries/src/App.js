import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => {
  const name=props.id
  return(
  <button onClick={props.handleShow.bind(this, name)}>
    {props.text}
  </button>
  )
}

const Filter = ({value, onChange}) => <div>find countries <input value={value} onChange={onChange} /></div>

const Many = () => <p>Too many matches, specify another filter</p>

const More = ({countryname, handleShow}) =>{
  // console.log(countryname)
  return(
    <p>{countryname}  <Button id={countryname} handleShow={handleShow} text="show" /> </p>
  )
} 

const Language = ({language}) => <li>{language}</li>

const Languages = ({languages}) => {
  return(
    languages.map(language => {
      // console.log('lan2:', language)
      return(
        <Language key={language} language={language} />
      )
    })  
  )
}

const Weather = ({country}) => {
  // const [weather, setWeather] = useState([])
  const [temp, setTemp] = useState(0)
  const [pic, setPic] = useState('')
  const [wind, setWind] = useState(0)

  let api_key = process.env.REACT_APP_API_KEY
  api_key = api_key.replace(/'/g, "")
  const latlng = country.capitalInfo.latlng
  // console.log('api_key', api_key)
  // const api = ("https://api.openweathermap.org/data/2.5/weather?lat=" + latlng[0] + "&lon=" + latlng[1] + "&appid=" + api_key) 
  const api = ''.concat("https://api.openweathermap.org/data/2.5/weather?lat=", latlng[0], "&lon=", latlng[1], "&appid=", api_key)
  console.log('api', api)
  const getData = () => {
    axios.get(api).then(response => {
      console.log('weather got')
      console.log(response.data)
      // setWeather(response.data)
      setTemp(response.data.main.temp)
      setPic("http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png")
      setWind(response.data.wind.speed)
    })
    .catch(error => console.log('error', error))
  }
  useEffect(getData, [])
  console.log('temp',temp)
  // const pic = ("http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png")
  console.log('icon picture:', pic)
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temprature {temp} Celcius</p>
      <img src={pic}></img>
      <p>wind {wind}m/s</p>
    </div>
  )
}

const One = ({country}) =>{
  // console.log('languages:', Object.values(country.languages))
  const languages = Object.values(country.languages)
  // languages.map(lan => console.log('lan:', lan))
  return(
      <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}<br />
      area {country.area}</p>
      <h2>languages:</h2>
      <ul>
      <Languages languages={languages} />
      </ul>
      <img src={country.flags.png} alt={country.name.common}></img>
      <Weather country={country} />
      </div>
  )
}

const Countries = ({countries, newFilter, handleShow}) =>{
  // console.log('countries', countries)
  const filtered = countries.filter(country=>
    country.name.common.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
  )

  if(filtered.length > 10){
    return <Many />
  }else if(filtered.length > 1){
    return(
      filtered.map(country =>
        // console.log(country.name.common)
        <More key={country.name.common} countryname={country.name.common} handleShow={handleShow} />
        )
    )
  }else{
    return(
      filtered.map(country =>
        <One key={country.name.common} country={country} />
      )
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])  


  const handleShow = (name, e) => {
    // console.log(name)
    setNewFilter(name)
  }

  const handleFilterChange = (event) =>{
    console.log('handleFilterChange', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} handleShow={handleShow}/>
    </div>
  )
}

export default App;
