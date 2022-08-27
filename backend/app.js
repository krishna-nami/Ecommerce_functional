import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config({ path: 'backend/config/config.env' });
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

//import middleware
import { errorMiddleware } from './middleware/error.js';

//imports models
import user from './routes/userRoute.js';
import product from './routes/productRoute.js';
import order from './routes/orderRoute.js';
import payment from './routes/paymentRoute.js';

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//middleware for Errors

app.use(errorMiddleware);
export default app;
