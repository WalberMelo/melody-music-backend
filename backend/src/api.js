const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("../routes/userRoutes");
const adminRouter = require("../routes/adminRoutes");
const port = 3000;
const app = express();

//Connect to Data Base
connectDB();

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//End-Points
app.use("/.netlify/functions/api", userRouter);
app.use("/.netlify/functions/api", adminRouter);

app.listen(port),
  console.log(`Server is running Port http://localhost:${port}`);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
