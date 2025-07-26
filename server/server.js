require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const userRoute = require("./route/userRoute");
const jobRoute = require("./route/jobRoute");
const applicationRoute = require("./route/applicationRoute");
const notificationRoute = require("./route/notificationRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
const allowedOrigins = process.env.CLIENT_URL?.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
}));

// Routes
app.use("/user", userRoute);
app.use("/job", jobRoute);
app.use("/application", applicationRoute);
app.use("/notification", notificationRoute);

// Root Test Route
app.get("/", (req, res) => {
  res.send("HireScape API is running.");
});

// Error handler
app.use(errorHandler);

// Connect DB and start server
connectDb();

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected ✅");
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
});
