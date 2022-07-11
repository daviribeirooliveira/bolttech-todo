import { AddTask, Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Project } from '../../types/Project';
import { ProjectsListProps } from '../../types/props/ProjectsListProps';
import { Task } from '../../types/Task';

import * as React from 'react';
import ProjectsClient from '../../clients/ProjectsClient';
import TasksClient from '../../clients/TasksClient';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeaderTextInput: {
    flex: 1,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardTask: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
};

export default function ProjectsList(props: ProjectsListProps): JSX.Element {
  const { projects, setProjects } = props;

  const [projectsCardsTitlesStatus, setProjectsCardsTitlesStatus] =
    React.useState({} as any);

  const [projectsCardsTitlesText, setProjectsCardsTitlesText] = React.useState(
    {} as any,
  );

  const projectsCardsTextInputs = {} as any;

  React.useEffect(() => {
    async function FetchApi() {
      const response = await ProjectsClient.get();

      setProjects([...response]);
    }

    FetchApi();
  }, []);

  async function updateProject(projectId: string, description: string) {
    if (description.length === 0) return;

    const project = projects.find((project) => project.id === projectId);

    if (!project) return;

    project.description = description;

    await ProjectsClient.put(project);

    setProjectsCardsTitlesStatus({
      ...projectsCardsTitlesStatus,
      [project.id]: false,
    });
    setProjects([...projects]);
  }

  async function deleteProject(projectId: string) {
    await ProjectsClient.delete(projectId);

    setProjects(projects.filter((project) => project.id !== projectId));
  }

  async function addTask(projectId: string, description: string) {
    if (description.length === 0) return;

    const task = await TasksClient.post(projectId, description);

    const project = projects.find((project) => project.id === projectId);

    if (!project) return;

    if (!project.tasks) project.tasks = [];

    project.tasks.push(task);

    setProjects([...projects]);
  }

  async function updateTask(projectId: string, taskId: string) {
    const project = projects.find((project) => project.id === projectId);

    if (!project) return;

    const taskIndex = project.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) return;

    project.tasks[taskIndex].checked = !project.tasks[taskIndex].checked;

    await TasksClient.put(project.tasks[taskIndex]);

    setProjects([...projects]);
  }

  async function deleteTask(projectId: string, taskId: string) {
    await TasksClient.delete(taskId);

    const project = projects.find((project) => project.id === projectId);

    if (!project) return;

    project.tasks = project.tasks.filter((task) => task.id !== taskId);

    setProjects([...projects]);
  }

  function renderCardHeader(project: Project): JSX.Element {
    return (
      <Box sx={styles.cardHeader}>
        {projectsCardsTitlesStatus[project.id] ? (
          <TextField
            defaultValue={project.description}
            sx={styles.cardHeaderTextInput}
            variant="outlined"
            onChange={(event) =>
              setProjectsCardsTitlesText({
                ...projectsCardsTitlesText,
                [project.id]: event.target.value,
              })
            }
            onMouseOut={() =>
              updateProject(project.id, projectsCardsTitlesText[project.id])
            }
          />
        ) : (
          <Typography gutterBottom variant="h4">
            {project.description}
          </Typography>
        )}
        <Box>
          <IconButton
            onClick={() =>
              setProjectsCardsTitlesStatus({
                ...projectsCardsTitlesStatus,
                [project.id]: !projectsCardsTitlesStatus[project.id],
              })
            }
          >
            <Edit color="primary" />
          </IconButton>
          <IconButton onClick={() => deleteProject(project.id)}>
            <Delete color="primary" />
          </IconButton>
        </Box>
      </Box>
    );
  }

  function renderCardTasks(
    project: Project,
    task: Task,
    isChecked: boolean,
  ): JSX.Element {
    return (
      <Box sx={styles.cardTask} key={task.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onClick={() => updateTask(project.id, task.id)}
              size="small"
            />
          }
          label={<Typography>{task.description}</Typography>}
        />
        <IconButton onClick={() => deleteTask(project.id, task.id)}>
          <Delete color="primary" />
        </IconButton>
      </Box>
    );
  }

  function renderTodoTasks(project: Project): JSX.Element {
    if (project?.tasks?.some((task: Task) => task.checked === false)) {
      return (
        <Box sx={styles.cardBody}>
          <Typography gutterBottom variant="h6">
            To Do
          </Typography>
          {project?.tasks
            ?.filter((task: Task) => task.checked === false)
            .map((task: Task) => renderCardTasks(project, task, false))}
        </Box>
      );
    }
    return <></>;
  }

  function renderDoneTasks(project: Project): JSX.Element {
    if (project?.tasks?.some((task: Task) => task.checked === true)) {
      return (
        <Box>
          <Box sx={styles.cardBody}>
            <Typography gutterBottom variant="h6">
              Done
            </Typography>
            {project?.tasks
              ?.filter((task: Task) => task.checked === true)
              .map((task: Task) => renderCardTasks(project, task, true))}
          </Box>
        </Box>
      );
    }
    return <></>;
  }

  function renderCardBody(project: Project): JSX.Element {
    return (
      <Box sx={styles.cardBody}>
        {renderTodoTasks(project)}
        {renderDoneTasks(project)}
      </Box>
    );
  }

  function renderCardFooter(project: Project): JSX.Element {
    return (
      <Box sx={styles.cardFooter}>
        <TextField
          fullWidth
          placeholder="Task"
          size="small"
          variant="outlined"
          onChange={(event) =>
            (projectsCardsTextInputs[project.id] = event.target.value)
          }
        />
        <IconButton
          onClick={() =>
            addTask(project.id, projectsCardsTextInputs[project.id])
          }
        >
          <AddTask color="primary" />
        </IconButton>
      </Box>
    );
  }

  function renderCard(project: Project): JSX.Element {
    return (
      <Card>
        <CardContent>
          {renderCardHeader(project)}
          {renderCardBody(project)}
          {renderCardFooter(project)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projects?.map((project: Project) => (
          <Grid item xs={2} sm={4} md={4} key={project.id}>
            {renderCard(project)}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
