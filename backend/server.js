import app from './app.js';
import connectDatabase from './config/database.js';

//handling uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Shutting down the server due to the Unhandled Exception `);
  process.exit(1);
});

//connection to databae
connectDatabase();

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
