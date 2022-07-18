import ErrorHandler from '../utils/errorhandler.js';
import asyncErrorsHandlers from './asyncErrorsHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const isAuthenticated = asyncErrorsHandlers(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('please login to access this resource.', 401));
  }
  const data = jwt.verify(token, process.env.JWT_TOKEN);

  req.user = await User.findById(data.id);
  next();
});

//check the role of the user
export const authorizeduser = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
