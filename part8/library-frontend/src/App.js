import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUser = localStorage.getItem("library-user-token");
    if (loggedUser) {
      setToken(loggedUser)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded
      window.alert(`New book added: ${book.title} by ${book.author.name}`)
      updateCache(client.cache, { query: ALL_BOOKS }, book)
    }
  })

  return (
    <div>
      <Router>
        <div>
          <Link to="/">
            <button>authors</button>
          </Link>
          <Link to="/books">
            <button>books</button>
          </Link>
          {!token && <Link to="/login">
            <button>login</button>
          </Link>}
          {token && <Link to="/add">
            <button>add</button>
          </Link>}
          {token && <Link to="/recommend">
            <button>recommend</button>
          </Link>}
          {token && <button onClick={logout}>logout</button>}
        </div>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          {!token && <Route path="/login" element={<LoginForm setToken={setToken} />} />}
          {token && <Route path="/add" element={<NewBook />} />}
          {token && <Route path="/recommend" element={<Recommend />} />}
        </Routes>
      </Router>
    </div>
  )
}

export default App