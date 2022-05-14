const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites");
const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

//Adding a favorite
router.post("/favorite/add", isAuthenticated, async (req, res) => {
  const { title, path, extension, description, elementID } = req.fields;
  console.log(req.fields);
  try {
    const newFavorite = new Favorites({
      title: title,
      path: path,
      extension: extension,
      description: description,
      elementID: elementID,
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
  const token = req.fields.token;
  try {
    const user = await User.findOne({ token: token });
    await Favorites.findOneAndDelete({
      elementID: req.fields.id,
      owner: user._id,
    });
    res.status(200).json({ success: "removed from the playlist" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get favorites
router.get("/favorite", async (req, res) => {
  const token = req.fields.token;
  try {
    const user = await User.findOne({ token: token });
    const list = await Favorites.find({ owner: user._id });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
