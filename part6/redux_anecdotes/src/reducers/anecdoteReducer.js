import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteReducerSlice = createSlice({
  name: 'anecdoteReducer',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteReducerSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (input) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(asObject(input))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const toVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToVote = await anecdoteService.like(anecdote)
    dispatch(vote(anecdoteToVote))
  }
}

export default anecdoteReducerSlice.reducer

