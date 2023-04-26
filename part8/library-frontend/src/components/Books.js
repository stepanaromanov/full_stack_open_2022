import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Books = () => {
  const [activeGenre, setActiveGenre] = useState('all genres')
  const [books, setBooks] = useState([])
  
  const [booksResult, { loading, data }] = useLazyQuery(ALL_BOOKS)
  
  useEffect(() => {
    if (activeGenre === 'all genres') {
      booksResult()
    } else {
      booksResult({ variables: { genre: activeGenre } })
    }
  }, [booksResult, activeGenre])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  const genres = [...new Set(books.map(book => book.genres).flat()), 'all genres']

  if (loading) {
    return <div>loading...</div>
  }

  if (!books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>In genre <b>{activeGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre, i) => (
        <button key={i} onClick={() => setActiveGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
