import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number} </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log('handleNameChange', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handleNumberChange', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    console.log('handleFilterChange', event.target.value)
    setNewFilter(event.target.value)
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
      <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
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
        {persons.filter(person=>
          person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
        ).map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App