import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter'
import Form  from './components/Form'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successNotification, setSuccessNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
  
    if (persons.find((record) =>
                record.name === newName &&
                record.number !== newNumber)) {
                    const changedPerson = {...persons.find((record) =>
                                                            record.name === newName &&
                                                            record.number !== newNumber)
                                            ,number: newNumber}
                    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    personService
                        .update(changedPerson)
                        .then(returnedPerson => {
                            setPersons(persons.map(person => 
                                person.id !== changedPerson.id ? 
                                  person : 
                                  returnedPerson)
                                )
                        })
                        .then(result => {
                            setSuccessNotification(
                              `${newName}'s number changed`
                            )
                            setTimeout(() => {
                                setSuccessNotification(null)
                            }, 3000)
                        })
                        .catch(error => {
                          setPersons(persons.filter(n => n.id !== changedPerson.id))
                          setErrorMessage(
                            `Information of ${newName} has already been removed from server`
                          )
                          setTimeout(() => {
                              setErrorMessage(null)
                          }, 3000)
                        })
                    }
    }

    else if (persons.find((record) =>
                record.name === newName &&
                record.number === newNumber)) {
                setErrorMessage(
                  `${newName} is already added to phonebook`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
    }

    else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        setSuccessNotification(
          `${newName} is added`
        )
        setTimeout(() => {
            setSuccessNotification(null)
        }, 3000)
    })
  }
  setNewName('')
  setNewNumber('')
}

  const handleNewNames = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumbers = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilters = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePersons = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService.
        deletePerson(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
    }
  }

  const personsToShow = persons.filter(record => 
                        record.name.toLowerCase()
                        .includes(newFilter.toLowerCase())
                        )
                        
  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNotification message={successNotification} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} 
              handleFilters={handleFilters} />
      <h2>add a new</h2>
      <Form newName={newName} 
            newNumber={newNumber} 
            handleNewNames={handleNewNames} 
            handleNewNumbers={handleNewNumbers}
            addPerson={addPerson} />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
                        <Person key={person.id}
                                person={person}
                                deleteButton={() => deletePersons(person)}
                        />)
        }
      </ul>
    </div>
  )
}

export default App