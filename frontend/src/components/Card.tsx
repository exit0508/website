import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectProps } from "../contexts";

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="pb-5">
      <Card key={project.id}>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.projectDate}</CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter>
          <a href={project.publicLink}>
            <p>Read more</p>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
