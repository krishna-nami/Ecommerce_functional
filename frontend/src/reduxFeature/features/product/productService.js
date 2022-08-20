import axios from 'axios';

const getProducts = async (keyword, currentPage, price, category, rating) => {
  let link;

  if (category) {
    link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
  } else {
    link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
  }

  const { data } = await axios.get(link);
  return data;
};

const getProduct = async (productId) => {
  const { data } = await axios.get('/api/v1/product/' + productId);
  return data;
};
const productService = { getProducts, getProduct };
export default productService;
