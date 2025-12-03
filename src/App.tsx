// src/App.tsx
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CompletedTask from './components/CompletedTask';
import { CheckCircle } from '@mui/icons-material';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container, 
  Box,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #faf5ff, #f3e8ff, #e9d5ff)',
  paddingBottom: theme.spacing(4),
}));

const App: React.FC = () => {
  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const toggleCompletedTask = () => {
    setShowCompletedTask((prev) => !prev);
  };

  return (
    <GradientBackground>
      {/* Header */}
      <StyledAppBar position="sticky">
        <Container maxWidth="md">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 700, color: '#27272a' }}>
              Task Management
            </Typography>
            <IconButton
              onClick={toggleCompletedTask}
              color={showCompletedTask ? 'primary' : 'default'}
              sx={{ color: showCompletedTask ? '#2563eb' : '#52525b' }}
            >
              <CheckCircle />
            </IconButton>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Container maxWidth="md" sx={{ mt: 3, px: 3 }}>
        {/* Always visible quick add form */}
        <TaskForm />

        {/* Tasks Section */}
        <Box sx={{ mb: 3 }}>
          <TaskList />
        </Box>

        {/* Completed Tasks Section */}
        <Fade in={showCompletedTask}>
          <Box sx={{ mb: 3, display: showCompletedTask ? 'block' : 'none' }}>
            <CompletedTask />
          </Box>
        </Fade>
      </Container>
    </GradientBackground>
  );
};

export default App;
