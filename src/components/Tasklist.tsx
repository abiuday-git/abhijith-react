import React from 'react';
import { Task } from '../context/TaskContext';
 
interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}
 
const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => (
  <div>
    {tasks.map(task => (
      

<div key={task.id}>
        <h4>{task.title}</h4>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        {task.status === 'Pending' && (
           <button onClick={()=> onUpdate(task.id)}>Mark as Completed</button>
        )}
        

 <button onClick={()=> onDelete(task.id)}>Delete</button>
      </div>
    ))}
  </div>
);
 
export default TaskList;
 