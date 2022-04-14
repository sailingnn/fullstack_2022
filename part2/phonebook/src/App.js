import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number} </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log('handleNameChange', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handleNumberChange', event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    let index = persons.findIndex(item => {
      return item.name === newName
    })

    if (index != -1) {
      window.alert(newName + ' is already added to phonebook')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }     
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App