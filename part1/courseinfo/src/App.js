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
      <Header course={course}></Header>
      <Content course={course} />
      <Total course={course} />

      { /*<Display counter={counter} />
      <Button onClick={() => setCounter(counter+1)} text={"PLUS"}></Button>
      <Button onClick={() => setCounter(counter-1)} text={"MINUS"}></Button>
      <Button onClick={() => setCounter(0)} text={"ZERO"} ></Button>

      <div>
        {left}
        <Button onClick={handleLeftClick} text="Left" ></Button>
        <Button onClick={handleRightClick} text="Right" ></Button>
        {right}
        <History allClicks={allClicks} />
      </div> */}

    </div>
  )
}

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Content = (props) => {
  const arr = props.course.parts
  return (
    <>
      {arr.map(part => (<Part name={part.name} exercises={part.exercises} />))}
    </>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return <p>Number of exercises {total} </p>
}

const Part = (props) => (
  <p> {props.name} {props.exercises} </p>
)


export default App