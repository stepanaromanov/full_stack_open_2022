import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const like = async (anecdote) => {
    const votes = { votes: anecdote.votes + 1 }
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, votes)
    return response.data
}

export default {
  getAll,
  createNew,
  like
}