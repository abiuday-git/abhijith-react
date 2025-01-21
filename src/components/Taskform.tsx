import React, { useState } from 'react';
import { useTaskContext, Task } from '../context/TaskContext';
//import { toast } from 'react-toastify';
 
const TaskForm: React.FC = () => {
  const { dispatch } = useTaskContext();
  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'Low',
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      ('Title is required');
      return;
    }
 
    const newTask: Task = {
      id: Date.now(),
      title: form.title!,
      description: form.description || '',
      priority: form.priority as 'Low' | 'Medium' | 'High',
      status: 'Pending',
    };
 
    dispatch({ type: 'ADD_TASK', payload: newTask });
    ('Task added successfully!');
    setForm({ title: '', description: '', priority: 'Low' });
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Task Title" value={form.title || ''} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} />
      <select name="priority" value={form.priority || 'Low'} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};
 
export default TaskForm;
 