import axios from 'axios'
import { Task } from '../context/TaskContext';
 
const API_BASE = 'https://jsonplaceholder.typicode.com';
 
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE}/todos`);
  return response.data.slice(0, 10).map((task: any) => ({
    id: task.id,
    title: task.title,
    description: '',
    priority: 'Medium',
    status: task.completed ? 'Completed' : 'Pending',
  }));
};


 