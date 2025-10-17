const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("./config/database_connections");
require("dotenv").config();
const libraryRoutes = require("./routes/libraryRoutes");

app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/", libraryRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port " + process.env.PORT);
});
