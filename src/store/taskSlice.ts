// src/features/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as localStorageService from '../utils/localStorage';

export interface Task {
  id: string | number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
}

interface TaskState {
  tasks: Task[];
  completedTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  completedTasks: [],
};

export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const data = localStorageService.getTasks();
  return data.tasks;
});

export const fetchCompletedTasks = createAsyncThunk<Task[]>('tasks/fetchCompletedTasks', async () => {
  return localStorageService.getCompletedTasks();
});

export const addTask = createAsyncThunk<Task, Omit<Task, 'id' | 'createdAt'>>('tasks/addTask', async (task: Omit<Task, 'id' | 'createdAt'>) => {
  return localStorageService.addTask(task);
});

export const deleteTask = createAsyncThunk<string | number, string | number>('tasks/deleteTask', async (id: string | number) => {
  localStorageService.deleteTask(id);
  return id;
});

export const updateTask = createAsyncThunk<Task, Task>('tasks/updateTask', async (task: Task) => {
  return localStorageService.updateTask(task);
});

export const completeTask = createAsyncThunk<Task, Task>('tasks/completeTask', async (task: Task) => {
  return localStorageService.completeTask(task);
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchTasks.fulfilled, (state: TaskState, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state: TaskState, action: PayloadAction<Task[]>) => {
        state.completedTasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state: TaskState, action: PayloadAction<string | number>) => {
        state.tasks = state.tasks.filter((task: Task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task: Task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTask.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.filter((task: Task) => task.id !== action.payload.id);
        state.completedTasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
