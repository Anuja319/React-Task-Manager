const API_URL = "https://jsonplaceholder.typicode.com";
const STORAGE_KEY = "task_manager_tasks";

// Get tasks
export const getTasks = async () => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  // If we already have saved tasks, use them
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  // First time: fetch tasks from API
  const response = await fetch(`${API_URL}/todos?_limit=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  // Save initial tasks in browser storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return data;
};

// Get single task
export const getTaskById = async (id) => {
  const tasks = await getTasks();

  const task = tasks.find((item) => item.id === Number(id));

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// Create task
export const createTask = async (task) => {
  // Send request to API
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const newTaskFromAPI = await response.json();

  // Get existing local tasks
  const tasks = await getTasks();

  // Create a new local task
  const newTask = {
    ...newTaskFromAPI,
    id: Date.now(),
    userId: 1,
    title: task.title,
    completed: task.completed,
  };

  const updatedTasks = [...tasks, newTask];

  // Save updated list
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

  return newTask;
};

// Update task
export const updateTask = async (id, task) => {
  // Send PUT request to API
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const updatedTaskFromAPI = await response.json();

  // Get local tasks
  const tasks = await getTasks();

  // Update the matching task locally
  const updatedTasks = tasks.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        ...updatedTaskFromAPI,
        title: task.title,
        completed: task.completed,
      };
    }

    return item;
  });

  // Save updated tasks
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

  return updatedTasks.find((item) => item.id === Number(id));
};

// Delete task
export const deleteTask = async (id) => {
  // Send DELETE request to API
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  // Get local tasks
  const tasks = await getTasks();

  // Remove task locally
  const updatedTasks = tasks.filter((item) => item.id !== Number(id));

  // Save updated tasks
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

  return true;
};
