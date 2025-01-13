import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCompletedTasks } from '../store/taskSlice';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const CompletedTask: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { completedTasks } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchCompletedTasks());
      }, [dispatch]);

    return(
      <Container>
        <Typography variant="h4" gutterBottom>
            Completed Tasks
        </Typography>
        <List>
        {completedTasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={`Completed: ${new Date(task.completedAt!).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
        </List>
        </Container>
    )
}

export  default CompletedTask;