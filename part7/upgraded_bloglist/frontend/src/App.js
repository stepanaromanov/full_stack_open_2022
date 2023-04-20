import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { deleteNotification } from './reducers/notificationReducer'
import { useNotification, useNotificationDispatch } from './reducers/NotificationContext'
import { useUserProfile, useUserProfileDispatch } from './reducers/UserContext'
import Footer from './components/Footer'
import loginService from './services/login'
import getAllUsers from './services/users'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const notification = useNotification()
  const notificationDispatch = useNotificationDispatch()

  const userProfile = useUserProfile()
  const userProfileDispatch = useUserProfileDispatch()

  const queryClient = useQueryClient()

  useQuery('blogs', blogService.getAllBlogs, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  useQuery('users', getAllUsers, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const mutatedBlogs = blogs.map(blog => 
        blog.id === updatedBlog.id ? updatedBlog : blog)
      queryClient.setQueryData('blogs', mutatedBlogs)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.filter(blog => blog.id !== id))
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={userProfile.username}
          name="Username"
          id="loginusername"
          onChange={({ target }) => {
            userProfileDispatch({ type: 'SET_USERNAME', payload: target.value})
          }
        }
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={userProfile.password}
          name="Password"
          id="loginpassword"
          onChange={({ target }) => {
            userProfileDispatch({ type: 'SET_PASSWORD', payload: target.value})
          }
          }
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  const createBlog = async (title, author, url) => {
    try {
      const newBlogObject = {
        title,
        author,
        url,
      }
      newBlogMutation.mutate(newBlogObject)

      notificationDispatch({ type: 'CREATED', payload: newBlogObject })
      deleteNotification(notificationDispatch)
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: exception.response.data.error })
      deleteNotification(notificationDispatch)
    }
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>      
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userProfileDispatch({ type: 'SET_USER', payload: user})
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = userProfile.username
      const password = userProfile.password
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      userProfileDispatch({ type: 'LOGGED_IN', payload: user})
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: 'Wrong credentials' })
      deleteNotification(notificationDispatch)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      userProfileDispatch({ type: 'LOGGED_OUT' })
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: 'Problem with logging out' })
      deleteNotification(notificationDispatch)
    }
  } 

  const increaseLikes = async (blog) => {
    try {
      updateBlogMutation.mutate({...blog, likes: blog.likes + 1 })
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: `Can not increase likes for blog ${blog.title}` + exception.response.data.error })
      deleteNotification(notificationDispatch)
    }
  }
  
  const removeBlog = async (id) => {
    try {
      if (window.confirm("Do you really want to delete this blog?")) {
        deleteBlogMutation.mutate({id})
      }
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: 'Can not delete blog' + exception.response.data.error })
      deleteNotification(notificationDispatch)
    }
  }

  if (!userProfile.user) {
    return (
      <div>
      <Notification notification={notification}/>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>

      <h2>blogs</h2>

      {userProfile.user && <div>
            <>{userProfile.user.name} logged in {logoutForm()}</>
            </div>
      }
      <Router>
        <div>
          <Link style={{padding: 5}} to="/">blogs</Link>
          <Link style={{padding: 5}} to="/users">users</Link>
        </div>

        <Routes>
          <Route path="/" element={
              <BlogList create={createBlog} 
              />
            } 
          />

          <Route path="/blogs/:id" element={
              <Blog increaseLikes={increaseLikes}
                    removeBlog={removeBlog}
              />
            }
          />

          <Route path="/users" element={
              <Users />
            }
          />

          <Route path="/users/:id" element={
             <User />
            } 
          />

        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App