import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Project {
  title: string;
  date: string;
}

interface ProjectContextProps {
  projects: Project[];
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        //console.log("project: ", projects);
        setProjects(projects);
        setLoading(false);
      } catch (err: any) {
        setError(err.message ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};
