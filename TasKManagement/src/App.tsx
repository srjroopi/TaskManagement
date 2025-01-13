// src/App.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CompletedTask from './components/CompletedTask';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';

const App: React.FC = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm((prev) => !prev);
  };

  const toggleCompletedTask = () => {
    setShowCompletedTask((prev) => !prev);
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Task Management
              </Typography>
              <IconButton color="inherit" onClick={toggleCompletedTask}>
                <DoneAllIcon />
              </IconButton>
              
              <br />
              <IconButton color="inherit" onClick={toggleTaskForm}>
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br />
        </Box>
        {showTaskForm && (
          <Box my={3}>
            <TaskForm />
          </Box>
        )}
        {showCompletedTask && (
          <Box my={3}>
            <CompletedTask />
          </Box>
        )}
        <Box>
          <TaskList />
        </Box>
      </Box>
    </Container>
  );
};

export default App;