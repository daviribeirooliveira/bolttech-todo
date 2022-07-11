import { Task } from './Task';

export interface Project {
  id: string;
  description: string;
  creationDate: string;
  tasks: Task[];
}
