import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotifMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()
        const newItem = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(newItem))
        dispatch(createNotifMessage(`You added a new anecdote: ${newItem}`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm