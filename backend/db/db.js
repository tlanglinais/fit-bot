const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${dbConnection.connection.host}`.cyan.underline.bold
    );

    return dbConnection.connection;
  } catch (error) {
    console.log(error);
    console.log(`Error: ${error.name}`.red);
  }
};
module.exports = connectDB;
