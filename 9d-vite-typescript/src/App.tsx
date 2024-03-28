import "./App.css";

interface HeaderProps {
  name: string;
}

interface CoursesProps {
  courses: Array<{ name: string; exerciseCount: number }>;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: CoursesProps) => {
  return props.courses.map((course) => (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  ));
};

const Total = (props: CoursesProps) => {
  const totalExercises = props.courses.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
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
