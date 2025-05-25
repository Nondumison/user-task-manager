import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createUser = async (userData: { name: string; email: string }) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const createTask = async (
  userId: number,
  taskData: { title: string; description: string }
) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/${userId}/tasks`,
    taskData
  );
  return response.data;
};

export const getUserTasks = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}/tasks`);
  return response.data;
};
export const deleteUser = async (userId: number) => {
  await axios.delete(`${API_BASE_URL}/users/${userId}`);
};

export const deleteTask = async (taskId: number) => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
};
