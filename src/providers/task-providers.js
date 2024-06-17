const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchTasks = async () => {
    try {
        const res = await fetch(
            `${SERVER_URL}/api/tasks`
        );
        const data = res.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

export const addTask = async (newTask) => {
    try {
        const res = fetch(`${SERVER_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        return res;
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

export const updateTask = async (taskId, updatedTaskData) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/api/tasks/${taskId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTaskData),
            }
        );
        return res;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/api/tasks/${taskId}`,
            {
                method: "DELETE",
            }
        );
        return res
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};