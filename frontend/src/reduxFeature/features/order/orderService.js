import axios from 'axios';

const createOrder = async (newOrder) => {
  console.log(newOrder);
  const { data } = await axios.post('/api/v1/order/new', newOrder);
  console.log(data);
  return data.order;
};
const viewOrders = async () => {
  const { data } = await axios.get('/api/v1/orders/me');

  return data.orders;
};
const orderDetails = async (id) => {
  const { data } = await axios.get(`/api/v1/order/${id}`);

  return data.order;
};
const adminOrders = async () => {
  const { data } = await axios.get(`/api/v1/admin/orders`);
  return data;
};
const deleteAOrder = async (id) => {
  const { data } = await axios.delete(`/api/v1/admin/order/` + id);
  return data;
};
const updateAOrder = async (id, status) => {
  console.log(...status);
  const { data } = await axios.put(`/api/v1/admin/order/` + id, status);
  return data;
};
const orderService = {
  createOrder,
  viewOrders,
  orderDetails,
  adminOrders,
  deleteAOrder,
  updateAOrder,
};
export default orderService;
