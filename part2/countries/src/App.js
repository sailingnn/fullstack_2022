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
