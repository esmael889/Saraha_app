import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
