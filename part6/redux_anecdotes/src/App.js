import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteVisibilityFilter from './components/AnecdoteVisibilityFilter'
import Notification from './components/Notification'

const App = () => {
  return(
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteVisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
