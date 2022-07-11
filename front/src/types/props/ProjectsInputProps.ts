import { Project } from '../Project';

export interface ProjectsInputProps {
  projects: Project[];
  setProjects: (projectsList: Project[]) => void;
}
