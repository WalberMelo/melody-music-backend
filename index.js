const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

//Connect to Data Base
connectDB();

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: /\.herokuapp\.com$/ }));

// Routes
app.use("/admin", require("./routes/userRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/song", require("./routes/songRoutes"));
app.use("/playlist", require("./routes/playlistRoutes"));
app.use("/cloud", require("./routes/cloudinaryRoutes"));

app.listen(port),
  console.log(`Server is running Port http://localhost:${port}`);
