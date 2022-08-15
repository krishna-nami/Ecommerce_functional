import app from './app.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import connectDatabase from './config/database.js';
dotenv.config({ path: 'backend/config/config.env' });

//handling uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Shutting down the server due to the Unhandled Exception `);
  process.exit(1);
});

//connection to databae
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('This is the starting');
});
const server = app.listen(PORT, () => {
  console.log(`the application is listening in the address of ${PORT} number`);
});

//unhandled promise rejection in mongoDB
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to the Unhandled Promise REjection `
  );
  server.close();
  process.exit(1);
});
