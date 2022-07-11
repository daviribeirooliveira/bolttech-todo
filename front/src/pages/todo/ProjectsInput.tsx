import { AddTask } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { ProjectsInputProps } from '../../types/props/ProjectsInputProps';

import * as React from 'react';
import ProjectsClient from '../../clients/ProjectsClient';

const styles = {
  container: {
    paddingBottom: 4,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
};

export default function ProjectInput(props: ProjectsInputProps): JSX.Element {
  const { projects, setProjects } = props;

  const [projectDescription, setProjectDescription] = React.useState('');

  async function addProject() {
    if (projectDescription === '') return;

    const project = await ProjectsClient.post(projectDescription);

    setProjects([...projects, project]);
  }

  return (
    <Container sx={styles.container} maxWidth="xs">
      <Typography align="center" variant="h5">
        Create a new project
      </Typography>
      <Box sx={styles.inputGroup}>
        <TextField
          fullWidth
          onChange={(event) => setProjectDescription(event.target.value)}
          placeholder="Enter the project name"
          size="small"
          variant="outlined"
        />
        <IconButton color="primary" onClick={addProject}>
          <AddTask />
        </IconButton>
      </Box>
    </Container>
  );
}
