import axios from 'axios';

const setupAxios = () => {
  const instance = axios.create({
    baseURL: `http://localhost:8000/api`,
  });

  instance.interceptors.request.use(async (config) => {
    config.headers = config.headers || {};
    config.headers['Authorization'] = localStorage.getItem('token');

    return config;
  });

  return instance;
};

export const bffAxios = setupAxios();
