const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/database_connections");
const libraryRoutes = require("./routes/libraryRoutes");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.vercel.app"],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/", libraryRoutes);

module.exports = app;
