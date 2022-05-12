const express = require("express");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 80;
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

//Creation de la BDD
mongoose.connect("mongodb://127.0.0.1:27017/marvel");

//Import des routes
const comics = require("./routes/comics");
app.use(comics);

const signup = require("./routes/signup");
app.use(signup);

const login = require("./routes/login");
app.use(login);

const characters = require("./routes/characters");
app.use(characters);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log("Server has started 🚀");
});
