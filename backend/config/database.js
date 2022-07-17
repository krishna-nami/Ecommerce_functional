import mongoose from 'mongoose';
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDB is connected in the server: ${data.connection.host}`
      );
    });
};
export default connectDatabase;
