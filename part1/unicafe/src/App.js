import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="Good" onClick={() => setGood(good+1)} />
      <Button name="Neutral" onClick={() => setNeutral(neutral+1)} />
      <Button name="Bad" onClick={() => setBad(bad+1)} />

      <h2>Statistics</h2>
      <Statistics
        good = {good}
        neutral =  {neutral}
        bad =  {bad}
        total = {total}
        average = {(good - bad) / total}
        positive =  {good / total * 100}
      ></Statistics>
    </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, total, average, positive} = props

  if(!total) return <p>No Feedback Given</p>

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average.toFixed(1)} />
        <StatisticLine text="Positive %" value={positive.toFixed(1)} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  const { text, value } = props
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}


const Button = (props) => {
  const { name, onClick } = props
  return (<button onClick={onClick} >{name}</button> )
}
export default App