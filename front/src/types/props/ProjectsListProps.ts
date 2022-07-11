import { Project } from '../Project';

export interface ProjectsListProps {
  projects: Project[];
  setProjects: (projectsList: Project[]) => void;
}
