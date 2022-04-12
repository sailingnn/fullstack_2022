import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  // console.log(props)
  return (
    <div>
      <p> {props.text} {props.number} </p>
    </div>
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
    <div>
      <Content text="good" number={props.good} />
      <Content text="neutral" number={props.neutral} />
      <Content text="bad" number={props.bad} />
      <Content text="all" number={props.sum} />
      <Content text="average" number={props.average} />
      <Content text="positive" number={props.positive} />
    </div>
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