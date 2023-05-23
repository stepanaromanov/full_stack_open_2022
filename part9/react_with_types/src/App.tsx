interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  requirements: ["nodejs", "jest"];
  description: string;
  kind: "special"
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const App = () => {
  const Header = ({ courseName }: { courseName: string }): JSX.Element => {
    return (
      <h1>{courseName}</h1>
    )
  }
  
  const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
    return (
      <>
        {courseParts.map((part: CoursePart, i: number) => {
            const desc = part.kind !== 'group' ? part.description : null
            const bgInfo = part.kind === 'background' ? part.backgroundMaterial : null
            const req = part.kind === 'special' ? `required skills: ${part.requirements.join(', ')}` : null
            return (
              <div key={i}>
                <li><b>{part.name} {part.exerciseCount}</b></li>
                <br/>
                <i>{desc}</i>
                <br/>
                <span>{bgInfo}</span>
                <br/>
                <span>{req}</span>
                <br/>
              </div>
            )
          })
        }
      </>
    )
  }

  const Total = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
    return (
      <p>
        Number of exercises{" "} 
        {courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;