import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
 
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
}
 
interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}
 
type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Partial<Task> & { id: number } }
  | { type: 'DELETE_TASK'; payload: number };
 
const TaskContext = createContext<TaskContextType | undefined>(undefined);
 
const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};
 
// Hardcoded initial tasks
const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description 1', priority: 'High', status: 'Pending' },
  { id: 2, title: 'Task 2', description: 'Description 2', priority: 'Medium', status: 'Completed' },
  { id: 3, title: 'Task 3', description: 'Description 3', priority: 'Low', status: 'Pending' },
];
 
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
 
  // Set the initial tasks
  useEffect(() => {
    dispatch({ type: 'SET_TASKS', payload: initialTasks });
  }, []);
 
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
 
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
 