import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { addTask, deleteTask, fetchTasks, updateTask } from "@/providers/task-providers";
import styles from "@/styles/TaskList.module.css";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks()
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch(() => {
                alert("Error fetching tasks");
            });
    }, []);

    const handleAddTask = async (newTask) => {
        const res = await addTask(newTask);
        if (res.ok) {
            const addedTask = await res.json();
            setTasks([...tasks, addedTask]);
        }else{
          alert("Error adding task");
        }
    };

    const handleUpdateTask = async (taskId, updatedTaskData) => {
        const res = await updateTask(taskId, updatedTaskData);
        if (res.ok) {
            const updatedTask = await res.json();
            setTasks(
                tasks.map((task) => (task._id === taskId ? updatedTask : task))
            );
        } else {
            alert("Error updating task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        const res = await deleteTask(taskId);
        if (res.ok) {
            setTasks(tasks.filter((task) => task._id !== taskId));
        } else {
            alert("Error deleting task");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Todo List</h1>
            <TaskForm onAddTask={handleAddTask} />
            <br />
            {tasks.length>0 && (
                <table>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>

                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </table>
            )}
        </div>
    );
};

export default TaskList;
