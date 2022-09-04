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
const orderService = { createOrder, viewOrders, orderDetails };
export default orderService;
