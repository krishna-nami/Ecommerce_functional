import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchError from '../middleware/asyncErrorsHandler.js';

//controllers for order

export const newOrder = catchError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order --user Access

export const getOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('order not found', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get all orders for a logged user
export const getAllOrders = catchError(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  console.log(orders);
  if (!orders) {
    return next(new ErrorHandler('You dont have any orders', 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders for --Admin side

export const getAllOrdersAdmin = catchError(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find();

  let totalAmount = 0;
  off.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

//update order status --Admin Side
export const updateOrderStatus = catchError(async (req, res, next) => {
  console.log(req.user._id);
  const order = await Order.find(req.params.id);

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('you have already deliverd this order', 400));
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.status;
  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete orders --admin
export const deleteOrder = catchError(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('order not found', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
