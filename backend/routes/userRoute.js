import express from 'express';
import {
  createUser,
  loginUser,
  logout,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/create').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
export default router;
