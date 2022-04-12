const Header = (props) => {
  // console.log(props)
  return <h1>{props.course}</h1>
}
const Content = (props) => {
  // console.log(props)
  return (
    // <div>
      <p>
      <Part partname ={props.parts[0].name} exercises = {props.parts[0].exercises} />
      <Part partname ={props.parts[1].name} exercises = {props.parts[1].exercises} />
      <Part partname ={props.parts[2].name} exercises = {props.parts[2].exercises} />
      </p>
    // </div>
  )
}
const Part  = (props) => {
  return (
    // <div>
      <p>
      {props.partname} {props.exercises}
      </p>
    // </div>
  )
}
const Total = (props) => {
  let s = 0
  props.parts.forEach(value => {
    s += value.exercises
  })   
  return (
    // <div>
      <p>
      Number of exercises {s}
      </p>
    // </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App