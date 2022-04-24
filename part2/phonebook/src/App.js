import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, noteStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={noteStyle} >
      {message}
    </div>
  )
}

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
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {...infoStyle, color: 'red'}

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
        .catch(error=>{
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setPersons(persons.filter(p => p.id != person.id))
    }
  }
  // console.log("test id", persons[4].id)
  const addName = (event) => {
    event.preventDefault()

    let index = persons.findIndex(item => {
      return item.name === newName
    })

    const nameObject = {
      name: newName,
      number: newNumber,
      // id:persons.length + 1
    } 

    if (index !== -1) {
      // window.alert(newName + ' is already added to phonebook')
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        // console.log('id?', index)
        const id = persons[index].id
        personService
          .update(id, nameObject)
          .then(returnedPerson => {
            // console.log('returned update', returnedPerson)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setInfoMessage(
              `Changed number of ${newName} to ${newNumber}`
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          })
          .catch(error=>{
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id != id))
          })
      }
    } else {
    
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
      // setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} noteStyle={infoStyle} />
      <Notification message={errorMessage} noteStyle={errorStyle} />
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