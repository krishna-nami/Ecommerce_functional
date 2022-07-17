import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config({ path: 'backend/config/config.env' });
import product from './routes/productRoute.js';
import { errorMiddleware } from './middleware/error.js';
app.use(express.json());
//app.use(urlencoded(true));

app.use('/api/v1', product);

//middleware for Errors

app.use(errorMiddleware);
export default app;
