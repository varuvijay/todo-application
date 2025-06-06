import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8083',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach session ID
instance.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem('sessionId');
    if (data.login) {
      config.headers['X-Session-ID'] = data.sessionId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;