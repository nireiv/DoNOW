import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">DoNOW!</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <TaskForm />
        </Box>
        <Box mt={4}>
          <TaskList />
        </Box>
      </Container>
    </Box>
  );
};

export default App;