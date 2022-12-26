import { useState } from 'react'

const Button = ({handleClick, buttonText}) => (
  <button onClick={handleClick}>
    {buttonText}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text="positive" value={`${(good / (good + neutral + bad)) * 100}%`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <p><b>give feedback</b></p>
      <Button handleClick={() => setToGood(good + 1)} buttonText="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} buttonText="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} buttonText="bad" />
      <p><b>statistics</b></p>
      {good === 0 
      && neutral === 0 
      && bad === 0 ? "No feedback given" : <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  )
}

export default App