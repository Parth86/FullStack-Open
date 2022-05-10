import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)})
  }, [])


  const addPhone = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already in phonebook. Do you want to replace the numnber`)) {

        const oldPerson = persons.filter(person => person.name === newName)[0]
        const newPerson = {...oldPerson, number: newNumber}
        personsService.update(oldPerson.id, newPerson).catch((err) => setError(` informtion of ${oldPerson.name} has already been deleted`))
        setPersons(persons.map(person => person.name === newName ? newPerson : person))
      }
      return
    }
    const newPhone = {name: newName, number: newNumber, id: persons.length + 1}
    personsService
        .create(newPhone)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setError(`${newPhone.name} was added to the phonebook`)
          setTimeout(() => {setError(null)}, 5000)
        })
        .catch((err) => {
          console.log(err.response.data.error)
          setError(err.response.data.error)
          setInterval(() => {setError(null)}, 5000)
        })
  }

  const deletePhone = id => {
    if(window.confirm(`Confirm Delete ${persons.filter(person => person.id === id)[0].name}?`)){
      personsService.remove(id)
        .then(() => setPersons(persons.filter(person  => person.id !== id)))

    }
  }


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)

  }

  const filteredPersons = persons.filter(person => {
    const name = person.name.toLowerCase()
    const _filter = filter.toLowerCase()
    return (name.includes(_filter))
  })

  return (
    <div>
      <h1>FullStack Open - PhoneBook App</h1>
      <h2>Phonebook</h2>
      <Notification message={error} />
      <Filter text="Filter shown with a" value={filter} onChange={handleFilterChange} />

      <h3>Add a new </h3>
      <PersonsForm onSubmit={addPhone} inputs={[{value: newName, onChange: handleNameChange, text: "Name",}, {value: newNumber, onChange: handleNumberChange, text: "Number"}]} submitText="Add" />

      <h3>Numbers</h3>
      <Persons  persons={filteredPersons} deleteHandler={deletePhone} />
    </div>
  )
}

const Filter = (props) => {
  const { text, value, onChange } = props
  return (
    <div>{text} <Input value={value} onChange={onChange} /></div>
  )
}

const Person = (props) => {
  const { name, number, id } = props.person
  const { deleteHandler } = props
  
  return (
  <>
    <li>{name} {number}</li>
    <button onClick={() => deleteHandler(id)}>delete</button>
  </>
  )
}

const Persons = ({persons, deleteHandler}) => {
  return (
    <ul>
        {persons.map(person => <Person person={person} key={person.id} deleteHandler={deleteHandler}/>)}
    </ul>
  )
}

const Input = ({value, onChange}) => {
  return (<input value={value} onChange={onChange} />)
}

const PersonsForm = ({onSubmit, inputs, submitText}) => {
  return (
    <form onSubmit={onSubmit}>
        {inputs.map(input => (
          <div> {input.text} <Input value={input.value} onChange={input.onChange} key={input.text} /></div>
        ))}
        <button type="submit">{submitText}</button>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message == null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default App


