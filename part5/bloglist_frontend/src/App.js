import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          id="loginusername"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          id="loginpassword"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  const createBlog = async (title, author, url) => {
    try {
      const newBlogObject = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(newBlogObject));
      setMessage(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage("error" + exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>      
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Problem with logging out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } 

  const increaseLikes = async (id, targetBlog) => {
    try {
      const updatedBlog = await blogService.update(id, targetBlog)
      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage(`Can not increase likes for blog ${targetBlog.title}` + exception.response.data.error)
    }
  }

  const removeBlog = async (id) => {
    try {
      if (window.confirm("Do you really want to delete this blog?")) {
        await blogService.deleteBlog(id)
      }
      
      const updatedBlogs = blogs.filter(
        blog => blog.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage('Can not delete blog' + exception.response.data.error)
    }
  }

  if (!user) {
    return (
      <div>
      <Notification message={errorMessage} type='error' />      
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} type='success' />
      <Notification message={errorMessage} type='error' />
      
      <h2>blogs</h2>

      {user && <div>
            <p>{user.name} logged in {logoutForm()}</p>
            </div>
      }

      <Togglable buttonLabel="new blog">
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort((a,b) => a.likes > b.likes ? -1 : 1)
            .map(blog =>
                <Blog key={blog.id} 
                      blog={blog} 
                      user={user.name} 
                      increaseLikes={increaseLikes}
                      removeBlog={removeBlog}
                />)
      }

      <Footer />

    </div>
  )
}

export default App