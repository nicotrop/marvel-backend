const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Favorites = require("../models/Favorites");
const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

//Adding a favorite
router.post("/favorite/add", isAuthenticated, async (req, res) => {
  const { title, path, extension, description, elementID, type, dbID } =
    req.fields;
  let fav = null;

  try {
    if (dbID.length > 0) {
      fav = await Favorites.findById(dbID);
      if (fav) {
        const deleteFav = await Favorites.findByIdAndDelete(dbID);
        res.status(200).json([deleteFav, { message: "deleted" }]);
      }
    } else {
      const newFavorite = new Favorites({
        title: title,
        path: path,
        extension: extension,
        description: description,
        elementID: elementID,
        type,
      });
      newFavorite.owner = req.user;
      await newFavorite.populate("owner");
      await newFavorite.save();
      res.status(200).json([newFavorite, { message: "added" }]);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Get favorites
router.get("/favorite/list", isAuthenticated, async (req, res) => {
  if (req.user) {
    try {
      const list = await Favorites.find({ owner: req.user._id });
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(400).json({ message: "Could not find user" });
  }
});

module.exports = router;
