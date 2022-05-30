const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Favorites = require("../models/Favorites");
const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

//Adding a favorite
router.post("/favorite/add", isAuthenticated, async (req, res) => {
  const { title, path, extension, description, elementID } = req.fields;
  try {
    const favs = await Favorites({elementID: elementID, owner: req.user_id})
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
router.post("/favorite/delete", isAuthenticated, async (req, res) => {
  const { elementID } = req.fields;
  try {
    const deletedMarvel = await Favorites.findOneAndDelete({
      elementID: elementID,
      owner: req.user._id,
    });
    console.log(deletedMarvel);
    res.status(200).json({ success: "removed from the list" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get favorites
router.post("/favorite/list", isAuthenticated ,async (req, res) => {
  // const token = req.fields.token;
  console.log(req.user);
  if (req.user) {
    try {
      const list = await Favorites.find({owner: req.user._id});
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(400).json({ message: "Could not find user" });
  }
});

module.exports = router;
