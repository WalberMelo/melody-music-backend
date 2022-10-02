const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Atlas MongoDB setup
const dbusername = process.env.DB_USERNAME;
const dbpassword = process.env.DB_SECRET_KEY;
const dbcluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;
const dbUri = `mongodb+srv://${dbusername}:${dbpassword}@${dbcluster}.7gqlfp3.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(dbUri, connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database.", error);
  }
};

module.exports = connectDB;
