import React from 'react'

const Subheader = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}      
  </>

const Course = ({ course }) => {
  const sum = course.parts.reduce((sum, part)=>{
    return sum + part.exercises
  }, 0)
//   console.log('sum:', sum);
  
  return (
    <div>
      <Subheader course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}


export default Course