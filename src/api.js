import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  // Allows sending/receiving HttpOnly cookies
  withCredentials: true,
});

export default api;