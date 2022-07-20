import ErrorHandler from '../utils/errorhandler.js';
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  //wrong mongoDB ID error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid:  ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(
      err.keyVal
    )} found, please register with another email`;
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json web Token is invalid, Try again';
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error

  if (err.name === 'TokwnExpiredError') {
    const message = 'KJson Web Token expired, Please Try Again with new Token';
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.stack,
  });
};
