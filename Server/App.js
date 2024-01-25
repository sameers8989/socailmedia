const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const AuthRoutes = require("../Server/Routes/AuthRoutes");
const userRoutes = require("../Server/Routes/UserRoutes");
const postRoutes = require("../Server/Routes/Post");

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

const connectionString = "mongodb://127.0.0.1:27017/facebook";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to the database");

  const PORT = 100;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
