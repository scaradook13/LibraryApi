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
    origin: ["http://localhost:5173", "https://library-client-seven.vercel.app"],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/", libraryRoutes);

app.listen(process.env.PORT, () => { console.log("Server is running at port " + process.env.PORT); });

module.exports = app;
