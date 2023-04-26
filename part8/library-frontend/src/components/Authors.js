import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const Authors = () => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const authorsResult  = useQuery(ALL_AUTHORS)
  if (authorsResult.loading)  {
    return <div>loading...</div>
  }
  const authors = authorsResult.data.allAuthors

  if (!authors) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { 
                                name, 
                                born: parseInt(birthYear, 10) 
                              } 
                })
    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select 
            value={name} 
            onChange={({ target }) => setName(target.value)}
          >
            <option></option>
            {authors.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
