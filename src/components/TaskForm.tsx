// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTask } from '../store/taskSlice';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
  borderRadius: '23px',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #9333ea, #7c3aed)',
  color: 'white',
  fontWeight: 600,
  height: '48px',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  borderRadius: '23px',
  '&:hover': {
    background: 'linear-gradient(to right, #7c3aed, #6d28d9)',
  },
}));

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
    <StyledCard>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            type="text"
            placeholder="+ Add a new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '48px',
                fontSize: '16px',
                borderRadius: '23px',
              },
            }}
          />
          <GradientButton type="submit" variant="contained">
            ADD TASK
          </GradientButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TaskForm;
