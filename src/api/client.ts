import axios from 'axios';

// All calls go to the Go API (bizmap-demo-api), mounted under /api.
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});
