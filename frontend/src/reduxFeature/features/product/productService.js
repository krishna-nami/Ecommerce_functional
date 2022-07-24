import axios from 'axios';

const getProducts = async () => {
  const { data } = await axios.get('/api/v1/products');
  return data;
};

const getProduct = async (productId) => {
  const { data } = await axios.get('/api/v1/products/' + productId);
  return data;
};
const productService = { getProducts, getProduct };
export default productService;
