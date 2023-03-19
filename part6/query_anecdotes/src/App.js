import AnecdoteForm from './components/AnecdoteForm'
import Notification, { deleteNotification } from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './components/requests'
import { useNotification, 
         useNotificationDispatch } from './components/NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const notification = useNotification()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
    },
  })

  const incrementVotes = (anecdote) => {
      updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
      notificationDispatch({ type: 'VOTE', payload: anecdote.content })
      deleteNotification(notificationDispatch)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  } else if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification notification={notification}/>
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => incrementVotes(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
