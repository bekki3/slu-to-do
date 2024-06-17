import styles from "@/styles/TaskItem.module.css";
import { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleToggleComplete = async () => {
    try {
      const updatedTaskData = { ...task, completed: !task.completed };
      await onUpdateTask(task._id, updatedTaskData); // Call the parent's update function
    } catch (error) {
      console.error('Error toggling task completion:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = async () => {
    try {
      const updatedTaskData = {
        ...task,
        title: editedTitle,
        description: editedDescription,
      };
      await onUpdateTask(task._id, updatedTaskData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  return (
      <>
          {isEditing ? (
              <tr><td></td>
                  <td>
                      <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                      />
                  </td>
                  <td>
                      <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                      />
                  </td>
                  <td>
                      <button onClick={handleEditSave}>Save</button>
                  </td>
                  <td>
                      <button onClick={handleEditToggle}>Cancel</button>
                  </td>
              </tr>
          ) : (
              <tr>
                  <td>
                      <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={handleToggleComplete}
                      />
                  </td>
                  <td>
                      <span
                          style={{
                              textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                          }}
                      >
                          {task.title}
                      </span>
                  </td>
                  <td>
                      <span
                          style={{
                              textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                          }}
                      >
                          {task.description}
                      </span>
                  </td>
                  <td>
                      <button onClick={handleEditToggle}>Edit</button>
                  </td>
                  <td>
                      <button onClick={handleDelete}>Delete</button>
                  </td>
              </tr>
          )}
      </>
  );
};

export default TaskItem;
