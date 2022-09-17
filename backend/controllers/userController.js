import ErrorHandler from '../utils/errorhandler.js';
import catchError from '../middleware/asyncErrorsHandler.js';
import User from '../models/userModel.js';
import getToken from '../utils/getToken.js';
import sendEmail from '../utils/sendEmail.js';
import coludinary from 'cloudinary';

//Regiseter user--everyone
export const createUser = catchError(async (req, res, next) => {
  const mycloud = await coludinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    userImage: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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
    success: true,
    message: 'logged Out',
  });
});

//forget Password

export const forgotPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    return next(new ErrorHandler('Please enter the email', 404));
  }
  if (!user) {
    return next(new ErrorHandler('USer not found', 404));
  }
  const resetToken = user.resetPassword();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset/${resetToken}`;

  const message = `Your password reset Token is :- \n\n ${resetPasswordUrl} \n\n If you are not authorized this email, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password reset token`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Reset password token has sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchError(async (req, res, next) => {
  //create token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await user.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('Reset password Token is invalid or expired', 400)
    );
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHandler('Password doesnt match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  getToken(user, 200, user);
});

export const getUserDetails = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//change password
export const changePassword = catchError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password doesnt match', 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  getToken(user, 200, res);
});

//Update user details
export const updateUserDetails = catchError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.userImage.public_id;
    await coludinary.v2.uploader.destroy(imageId);
    const myCloud = await coludinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });
    newUserDetails.userImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  //We will update image later

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users --Admin only

export const getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get user detials by --Admin only

export const getSingleUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(` User doesnt exist witht he ID:${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    succes: true,
    user,
  });
});

//Update user Role and users details by admin side --admin part

export const updateuserByAdmin = catchError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //We will update image later

  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(` User doesnt exist witht he ID:${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: 'user Updated Successfylly',
  });
});

//delete user --admin part
export const deleteUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(` User doesnt exist witht he ID:${req.params.id}`, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: 'user deleted Successfylly',
  });
});
