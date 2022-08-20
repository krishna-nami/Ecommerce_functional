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
//load user
const loadUser = async () => {
  const response = await axios.get('/api/v1/myDetails');
  console.log(response.data);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const update = async (updatedUser) => {
  const response = await axios.put('/api/v1/me/update', updatedUser);
  return response.data.success;
};
const updatePassword = async (updatedPass) => {
  const response = await axios.put('/api/v1/password/update', updatedPass);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  await axios.get('/api/v1/logout');
  localStorage.removeItem('user');
};

const userService = {
  login,
  register,
  logout,
  update,
  loadUser,
  updatePassword,
};
export default userService;
