//import React from 'react';
const Course = ( { course } ) => {
    return (
      <>
        <Header course={course.name}  />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((sum, curr) => sum + curr.exercises, 0)} />
      </>
    )
}
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>

  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>

  const Content = ({ parts }) =>
    <>
      {parts.map(part => <Part part={part} key={part.id} />)}
    </>
export default Course