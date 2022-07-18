import ErrorHandler from '../utils/errorhandler.js';
import catchError from '../middleware/asyncErrorsHandler.js';
import User from '../models/userModel.js';
import getToken from '../utils/getToken.js';

//Regiseter user--everyone
export const createUser = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    userImage: {
      public_id: 'this is id',
      url: 'this is url',
    },
  });
  getToken(user, 201, res);
});

//login user
export const loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has both email and possword

  if (!email || !password) {
    return next(new ErrorHandler('please Enter Email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  getToken(user, 201, res);
});

//logout user

export const logout = catchError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: 'logged Out',
  });
});

//forget Password

export const forgetPassword = catchError(async (req, res, next) => {});
