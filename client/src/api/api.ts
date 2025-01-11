import axios, { AxiosInstance } from 'axios';

const baseAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseAxios;
