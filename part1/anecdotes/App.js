import { useState } from 'react'

const Button = ({handleClick, buttonText}) => (
  <button onClick={handleClick}>
    {buttonText}
  </button>
)

const Anecdote = ({anecdote, votes}) => (
  <div>
    {anecdote}
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const setToSelected = () => {
    const newValue = Math.round(Math.random() * (anecdotes.length - 1))
    setSelected(newValue)
  }
  const toVote = (newValue) => {
    const copy = [...votes]
    copy[newValue] += 1
    setVotes(copy)
  }

  const maxVotesIndex = votes.indexOf(Math.max.apply(null, votes))

  return (
    <div>
      <div>
        <p><b>Anecdote of the day</b></p>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      </div>
      <div>
        <Button handleClick={() => toVote(selected)} buttonText="vote" />
        <Button handleClick={() => setToSelected()} buttonText="next anecdote" />
      </div>
      <div>
        <p><b>Anecdote with most votes</b></p>
        <Anecdote anecdote={anecdotes[maxVotesIndex]} votes={votes[maxVotesIndex]} />
      </div>
    </div>
  )
}

export default App



