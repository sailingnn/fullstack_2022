import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const StatisticLine = (props) => {
  // console.log(props)
  return (
    <tbody>
      <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
      {/* <p> {props.text} {props.value} </p> */}
    </tbody>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.sum} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }
  const average = function(array) {
    let len = array.length
    let sum = 0
    if(len === 0){
      return 0
    }
    for(let i=0;i<len;i++){
      sum += array[i]
    }
    return sum/len
  }

  const positive = function(array) {
    let len = array.length
    let sum = 0
    if(len === 0){
      return 0
    }
    for(let i=0;i<len;i++){
      if(array[i] > 0){
        sum += 1
      }
    }
    return sum * 100 /len
  }

  return (
    <div>
      <Header name={"give feedback"} />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header name={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} sum={good + neutral + bad} average={average(allClicks)} positive={positive(allClicks) + ' %'} />
    </div>
  )
}

export default App