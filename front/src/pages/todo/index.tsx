import { Project } from '../../types/Project';

import * as React from 'react';
import ProjectsInput from './ProjectsInput';
import ProjectsList from './ProjectsList';

export default function ToDo(): JSX.Element {
  const [projects, setProjects] = React.useState(new Array<Project>());

  const projectsInputProps = {
    projects,
    setProjects,
  };

  const projectsListProps = {
    projects,
    setProjects,
  };

  return (
    <>
      <ProjectsInput {...projectsInputProps} />
      <ProjectsList {...projectsListProps} />
    </>
  );
}
