import app from './app.js';
import connectDatabase from './config/database.js';
//connection to databae
connectDatabase();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('This is the starting');
});
app.listen(PORT, () => {
  console.log(`the application is listening in the address of ${PORT} number`);
});
