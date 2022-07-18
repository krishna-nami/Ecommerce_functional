import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your name'],
    maxLength: [30, 'maxmium name cann;t cross 30 characters'],
    minLength: [4, 'Name should have more than 5 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter your Password'],
    minLength: [8, 'Password shloud more than 8 characters'],
    select: false,
  },
  userImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token

userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//Compare passowrd
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate Password reset Tokenm

userSchema.methods.resetPassword = async function () {
  //generate toketn
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
export default mongoose.model('User', userSchema);
