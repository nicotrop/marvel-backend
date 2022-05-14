const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites");
const isAuthenticated = require("../middleware/isAuthenticated");

//Adding a favorite
router.post("/favorites", isAuthenticated, async (req, res) => {
  const { title, path, extension, description } = req.fields;
  try {
    const newFavorite = new Favorites({
      title: title,
      img_path: path,
      img_extension: extension,
      description: description,
      owner: req.user,
    });
    await newFavorite.save();
    res.status(200).json(newFavorite);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Remove favorite
router.delete("/favorite/delete", async (req, res) => {
  try {
    await Favorites.findByIdAndDelete(req.fields.id);
    res.status(200).json({ message: "removed from favorites!" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
