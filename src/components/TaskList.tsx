// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchTasks, fetchCompletedTasks, deleteTask, updateTask, completeTask, Task } from '../store/taskSlice';
import { 
  Card, 
  CardContent, 
  Checkbox, 
  IconButton, 
  TextField, 
  Typography, 
  Box, 
  Chip,
  Stack
} from '@mui/material';
import { Edit, Delete, Save, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  transition: 'box-shadow 0.2s',
  borderRadius: '23px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [editMode, setEditMode] = useState<string | number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCompletedTasks());
  }, [dispatch]);

  const handleDelete = (id: string | number) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: Task) => {
    setEditMode(task.id);
    setEditTitle(task.title);
  };

  const handleUpdate = (task: Task) => {
    if (editTitle.trim()) {
      dispatch(updateTask({ ...task, title: editTitle }));
      setEditMode(null);
      setEditTitle('');
    }
  };

  const handleComplete = (task: Task) => {
    dispatch(completeTask(task));
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#27272a', mb: 2 }}>
        Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center', boxShadow: 1, borderRadius: '23px' }}>
          <Typography color="text.secondary">No tasks yet. Add one to get started!</Typography>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {tasks.map((task: Task) => (
            <StyledCard key={task.id}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleComplete(task)}
                    sx={{
                      color: '#a1a1aa',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                    }}
                  />
                  {editMode === task.id ? (
                    <TextField
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      fullWidth
                      autoFocus
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '36px',
                          borderRadius: '23px',
                        },
                      }}
                    />
                  ) : (
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: task.completed ? '#a1a1aa' : '#3f3f46',
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                        <Chip
                          label={new Date(task.createdAt).toLocaleDateString()}
                          size="small"
                          variant="outlined"
                          sx={{ height: '20px', fontSize: '0.75rem', bgcolor: '#f4f4f5', color: '#71717a', borderRadius: '23px' }}
                        />
                        {task.dueDate && (
                          <Chip
                            label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                            size="small"
                            sx={{
                              height: '20px',
                              fontSize: '0.75rem',
                              borderRadius: '23px',
                              bgcolor: new Date(task.dueDate) < new Date() && !task.completed
                                ? '#fee2e2'
                                : '#dbeafe',
                              color: new Date(task.dueDate) < new Date() && !task.completed
                                ? '#b91c1c'
                                : '#1e40af',
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {editMode === task.id ? (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdate(task)}
                          sx={{ color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}
                        >
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditMode(null);
                            setEditTitle('');
                          }}
                          sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(task)}
                          sx={{ color: '#2563eb', '&:hover': { bgcolor: '#dbeafe' } }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(task.id)}
                          sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TaskList;
