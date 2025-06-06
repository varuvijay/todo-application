import axios from './axios';

export const register = async (userData) => {
  console.log(userData);
  const response = await axios.post('/api/auth/register', userData);
  console.log(response.data);
  
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  if (response.data.sessionId) {
    const data = {
      "sessionId": response.data.sessionId,
      "login": true
    }
    localStorage.setItem('sessionId', data.sessionId);
    localStorage.setItem('isLoggedIn', 'true');
  }
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/api/auth/logout');
  localStorage.removeItem('sessionId');
  localStorage.removeItem('isLoggedIn');
  return response.data;
};