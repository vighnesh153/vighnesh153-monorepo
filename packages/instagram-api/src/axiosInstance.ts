import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://graph.facebook.com/v16.0',
});
