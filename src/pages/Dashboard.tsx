import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/Tasklist';
import TaskForm from '../components/Taskform';
 
const Dashboard: React.FC = () => {
  const { tasks, dispatch } = useTaskContext();
  const [filter, setFilter] = useState({ title: '', status: '' });
 
  const filteredTasks = tasks.filter(
    task =>
      task.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      (!filter.status || task.status === filter.status)
  );
 
  const handleUpdate = (id: number) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, status: 'Completed' } });
  };
 
  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };
 
  return (
    <div>
      <h1>Task Dashboard</h1>
      <input
        placeholder="Search by Title"
        onChange={e => setFilter({ ...filter, title: e.target.value })}
      />
      <select onChange={e => setFilter({ ...filter, status: e.target.value })}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <TaskList tasks={filteredTasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      <TaskForm />
    </div>
  );
};
 
export default Dashboard;
 