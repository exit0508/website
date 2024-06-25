import Card from "../components/Card";
import { useProjects } from "../contexts";

const Projects = () => {
  const { projects } = useProjects();
  console.log("aaaa", projects);
  return (
    <>
      <h1>Projects</h1>
      <Card />
    </>
  );
};

export default Projects;
