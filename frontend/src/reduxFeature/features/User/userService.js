import axios from 'axios';

const login = async (userData) => {
  const response = await axios.post('/api/v1/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const register = async (newUser) => {
  const response = await axios.post('/api/v1/create', newUser);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  await axios.get('/api/v1/logout');
  localStorage.removeItem('user');
};

const userService = { login, register, logout };
export default userService;
