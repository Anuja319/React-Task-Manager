const API_URL = "https://jsonplaceholder.typicode.com";

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/todos?_limit=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

export const getTaskById = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
};

export const createTask = async (task) => {
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

  return response.json();
};

export const updateTask = async (id, task) => {
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

  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return true;
};
