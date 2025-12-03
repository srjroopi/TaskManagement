import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCompletedTasks, Task } from '../store/taskSlice';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Stack,
  Avatar
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  transition: 'box-shadow 0.2s',
  borderRadius: '23px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const CompletedTask: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { completedTasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchCompletedTasks());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#27272a', mb: 2 }}>
        Completed Tasks
      </Typography>
      {completedTasks.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center', boxShadow: 1, borderRadius: '23px' }}>
          <Typography color="text.secondary">No completed tasks yet.</Typography>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {completedTasks.map((task: Task) => (
            <StyledCard key={task.id}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: '#d1fae5',
                      color: '#10b981',
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: '#a1a1aa',
                        textDecoration: 'line-through',
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip
                        label={`Created: ${new Date(task.createdAt).toLocaleDateString()}`}
                        size="small"
                        variant="outlined"
                        sx={{ height: '20px', fontSize: '0.75rem', bgcolor: '#f4f4f5', color: '#71717a', borderRadius: '23px' }}
                      />
                      {task.completedAt && (
                        <Chip
                          label={`Completed: ${new Date(task.completedAt).toLocaleDateString()}`}
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '0.75rem',
                            borderRadius: '23px',
                            bgcolor: '#10b981',
                            color: 'white',
                          }}
                        />
                      )}
                    </Stack>
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

export default CompletedTask;
