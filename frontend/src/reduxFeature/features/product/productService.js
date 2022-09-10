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
const createReview = async (reviewData) => {
  const { data } = await axios.put('/api/v1/review', reviewData);
  console.log(data);
};
const getAdminProducts = async () => {
  const { data } = await axios.get('/api/v1/adminLogin/products');
  return data.products;
};
const deleteAProduct = async (id) => {
  console.log(id);
  const { data } = await axios.delete('/api/v1/product/' + id);
  console.log(data);
  return data;
};
const createAProduct = async (product) => {
  const { data } = await axios.post('/api/v1/product/new', product);
  console.log(data);
  return data;
};
const updateAProduct = async (product) => {
  let id = product.id;
  const { data } = await axios.put('/api/v1/product/' + id, product.myForm);
  return data;
};
const productService = {
  getProducts,
  getProduct,
  createReview,
  getAdminProducts,
  deleteAProduct,
  createAProduct,
  updateAProduct,
};
export default productService;
