const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const port = 9001;
const app = express();

//Connect to Data Base
connectDB();

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//End-Points
app.use( userRouter);
app.use( adminRouter);
app.get ("/", (req, res) => {
  res.send("HOLA HOMEPAGE ");})
app.listen(port),
  console.log(`Server is running Port http://localhost:${port}`);


