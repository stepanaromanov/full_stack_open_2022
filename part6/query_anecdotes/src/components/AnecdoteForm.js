import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import { deleteNotification } from './Notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      notificationDispatch({ type: 'ERROR', 
                              payload: `The minimum length of an anecdote is 5 letters.` })
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 }, {
        onSuccess: () => {
          notificationDispatch({ type: 'SET', 
                                payload: content })
          deleteNotification(notificationDispatch)
        },
        onError: (error) => {
          notificationDispatch({ type: 'ERROR', 
                                payload: error.response.data.error })
          deleteNotification(notificationDispatch)
        }
      })
    }
  }
  
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
