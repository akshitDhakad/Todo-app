
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tasks"; 

// Get all tasks
export const fetchTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Add a new task
export const createTask = async (task) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

// Delete all tasks
export const deleteAllTasks = async () => {
  await axios.delete(API_BASE_URL);
};
