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
      <p>
       {props.text} {props.number}
      </p>
    </div>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header name={"statistics"} />
      <Content text="good" number={good} />
      <Content text="neutral" number={neutral} />
      <Content text="bad" number={bad} />
    </div>
  )
}

export default App