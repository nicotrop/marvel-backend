const express = require("express");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(cors());
app.use(formidableMiddleware());

//Import des routes
const comics = require("./routes/comics");
app.use(comics);

const characters = require("./routes/characters");
app.use(characters);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log("Server has started 🚀");
});
