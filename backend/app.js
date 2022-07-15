import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config({ path: 'backend/config/config.env' });
import product from './routes/productRoute.js';
app.use(express.json());
//app.use(urlencoded(true));

app.use('/api/v1', product);

export default app;
