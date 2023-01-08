const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>  
)

const Content = ({cparts}) => (
    <div>
        {cparts.map(part => (
            <Part key={part.id} part={part} />)
        )}
    </div>
)

const Header = ({cname}) => (
    <h2>{cname}</h2>
)

const Course = ({course}) => {
    const totalSum = course.parts.map(elem => elem.exercises)
                                 .reduce((sum, a) => sum + a)

    return (
      <div>
          <Header cname={course.name} />
          <Content cparts={course.parts} />
          <p><b>total of {totalSum} exercises</b></p> 
      </div>
    )
}

export default Course