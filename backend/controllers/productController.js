import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchError from '../middleware/asyncErrorsHandler.js';
import ApiFeatures from '../utils/apifeatures.js';

//create a product --Admin only
export const createProduct = catchError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//get all rpoducts --for everyone
export const getAllProducts = catchError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});
//update Product--Admin
export const updateProduct = catchError(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product not found',
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete specific product ---Admin ony
export const deleteProduct = catchError(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product not found',
    });
  }
  product = await product.remove();
  res
    .status(200)
    .json({ success: true, message: 'Product deleted Successfully' });
});

//get a specific product -- Admin only
export const getProductDetails = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not Found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
