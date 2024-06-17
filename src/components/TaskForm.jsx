import styles from "@/styles/TaskForm.module.css";
import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    const newTask = { title, description, completed: false };

    try {
      await onAddTask(newTask);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <input 
          placeholder='Title'
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required // Make title field required
        />
      </div>
      <div>
        <textarea
        placeholder='Description'
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
