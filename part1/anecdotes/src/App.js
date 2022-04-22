import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomNum = (length) => {
    const rand =  Math.floor(Math.random() * length)
    setSelected(rand)
  }

  const addVote = (index) => {
    const arr = [...votes]
    arr[index] += 1
    setVotes(arr)
  }

  const getMax = (votes) => {
    let index = 0
    for(let i=0; i<votes.length; i++) { // get the index with highest votes
      if(votes[i] > votes[index]) index = i
    }
    return index
  }

  return (
    <div>
      <h1>Programming Quotes</h1>
      
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => getRandomNum(anecdotes.length)}>Random Quote</button>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => addVote(selected)}>Vote</button>

      <h2>Anecdote with highest votes</h2>
      <p>{anecdotes[getMax(votes)]}</p>
      <p>has {votes[getMax(votes)]} votes</p>
    </div>
  )
}

export default App;
