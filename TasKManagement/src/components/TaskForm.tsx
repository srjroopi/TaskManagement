// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTask } from '../store/taskSlice';
import { TextField, Button, Box } from '@mui/material';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ title, completed: false }));
      setTitle('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} alignItems="center" sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{
            width:620
        }}
      />
      <Button type="submit" variant="contained" color="primary"
      sx={{
        borderRadius:0
      }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
