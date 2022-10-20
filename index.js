const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const playlistRouter = require("./routes/playlistRoutes");
const songRouter = require("./routes/songRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const port = 3000;
const app = express();

//Connect to Data Base
connectDB();

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//End-Points
app.use(userRouter);
app.use(adminRouter);
app.use(playlistRouter);
app.use(songRouter);

app.listen(port),
  console.log(`Server is running Port http://localhost:${port}`);
