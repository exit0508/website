import { ProjectProps } from "../contexts";
import ProjectCard from "./Card";

const CardList = ({ projects }: { projects: ProjectProps[] }) => {
  return (
    <>
      {Array.isArray(projects) &&
        projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </>
  );
};

export default CardList;
