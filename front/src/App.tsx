import * as React from 'react';
import AppBar from './components/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import ToDo from './pages/todo';

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <ToDo />
    </React.Fragment>
  );
}
