import { useDispatch, useSelector } from 'react-redux'
import { toVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { createNotifMessage } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => 
        state.filter
            ? state.anecdotes.filter(anecdote => 
                anecdote.content.toLowerCase().includes(
                    state.filter.toLowerCase())
                )
            : state.anecdotes
    )
    
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const sortedAnecdotes = [...anecdotes].sort((a,b) => {
        return a.votes < b.votes ? 1 : -1
    })

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={
                    () => {
                            dispatch(toVote(anecdote))
                            dispatch(createNotifMessage(`You voted an anecdote: ${anecdote.content}`, 5))
                        }
                }
                >vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList


