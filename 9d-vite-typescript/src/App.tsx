interface HeaderProps {
  name: string;
}

interface CoursesProps {
  courses: CoursePart[];
}

interface PartProps {
  course: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartRequirement extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirement;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: HeaderProps) => {
  const { name }: { name: string } = props;
  return <h1>{name}</h1>;
};

const Part = (props: PartProps) => {
  const { course }: { course: CoursePart } = props;
  switch (course.kind) {
    case "basic":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          project exercises {course.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          submit to {course.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          <i>{course.description}</i>
          <br />
          required skills: {course.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(course);
  }
};

const Content = (props: CoursesProps) => {
  const { courses }: { courses: CoursePart[] } = props;
  return courses.map((course) => <Part course={course} />);
};

const Total = ({ courses }: { courses: CoursePart[] }) => {
  const totalExercises = courses.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
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
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
