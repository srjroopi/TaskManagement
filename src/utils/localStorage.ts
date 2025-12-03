// src/utils/localStorage.ts
interface Task {
  id: string | number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
}

interface TaskData {
  tasks: Task[];
  completedTasks: Task[];
}

const STORAGE_KEY = 'taskManagementData';

// Initialize with default data if not exists
const defaultData: TaskData = {
  tasks: [],
  completedTasks: [],
};

export const getTasks = (): TaskData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Initialize with default data
    saveTasks(defaultData);
    return defaultData;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultData;
  }
};

export const saveTasks = (data: TaskData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  const data = getTasks();
  const newTask: Task = {
    ...task,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    createdAt: new Date().toISOString(),
  };
  data.tasks.push(newTask);
  saveTasks(data);
  return newTask;
};

export const deleteTask = (id: string | number): void => {
  const data = getTasks();
  data.tasks = data.tasks.filter((task) => task.id !== id);
  saveTasks(data);
};

export const updateTask = (updatedTask: Task): Task => {
  const data = getTasks();
  const index = data.tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    data.tasks[index] = updatedTask;
    saveTasks(data);
  }
  return updatedTask;
};

export const completeTask = (task: Task): Task => {
  const data = getTasks();
  const completedTask: Task = {
    ...task,
    completed: true,
    completedAt: new Date().toISOString(),
  };
  data.tasks = data.tasks.filter((t) => t.id !== task.id);
  data.completedTasks.push(completedTask);
  saveTasks(data);
  return completedTask;
};

export const getCompletedTasks = (): Task[] => {
  const data = getTasks();
  return data.completedTasks;
};

