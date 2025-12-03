// src/components/TaskFormDialog.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTask } from '../store/taskSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#52525b',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#2563eb',
  },
}));

const TaskFormDialog: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ 
        title, 
        completed: false,
        dueDate: dueDate || undefined
      }));
      setTitle('');
      setDueDate('');
      setDialogOpen(false);
    }
  };

  const handleClose = (event: object, reason?: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      if (title || dueDate) {
        setConfirmOpen(true);
        return;
      }
    }
    setDialogOpen(false);
    if (!title && !dueDate) {
      setTitle('');
      setDueDate('');
    }
  };

  const handleDiscard = () => {
    setConfirmOpen(false);
    setTitle('');
    setDueDate('');
    setDialogOpen(false);
  };

  const handleGoBack = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={() => setDialogOpen(true)}
        sx={{ color: '#52525b', '&:hover': { color: '#2563eb' } }}
      >
        <Add />
      </IconButton>

      <Dialog 
        open={dialogOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 600, color: '#18181b' }}>
            New message
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Type something and try closing.
              </Typography>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder=""
                multiline
                rows={5}
                fullWidth
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '120px',
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <StyledButton onClick={() => handleClose({}, 'buttonClick')}>
              Cancel
            </StyledButton>
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                bgcolor: '#18181b',
                '&:hover': { bgcolor: '#27272a' }
              }}
            >
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onClose={handleGoBack}>
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <Typography>Your message will be lost.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoBack}>Go back</Button>
          <Button onClick={handleDiscard} variant="contained" color="error">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskFormDialog;
