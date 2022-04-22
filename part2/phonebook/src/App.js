import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, handleDelete }) => {  
  return(
    <p>{person.name} {person.number} <button onClick={handleDelete.bind(this, person)}>
    delete
  </button>
  </p>
  )  
}

const Filter = ({value, onChange}) => <div>filter shown with<input value={value} onChange={onChange} /></div>

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) =>{
  // console.log('PersonForm', props)
  return(
    <form onSubmit={addName}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, newFilter, handleDelete}) =>{
  // console.log('persons', persons)
  return(
    persons.filter(person=>
      person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
    ).map(person => 
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    )
  )
}
 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    // console.log('handleNameChange', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log('handleNumberChange', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    // console.log('handleFilterChange', event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = (person, e) =>{
    if (window.confirm(`Delete ${person.name} ?`)) {
      // console.log('delete...', person.name)
      personService
        .deleteID(person.id)
      setPersons(persons.filter(p => p.id != person.id))
    }
  }

  const addName = (event) => {
    event.preventDefault()

    let index = persons.findIndex(item => {
      return item.name === newName
    })

    if (index !== -1) {
      window.alert(newName + ' is already added to phonebook')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        // id:persons.length + 1
      }     
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      // setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm addName={addName} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App