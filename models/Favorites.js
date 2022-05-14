const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorites", {
  title: String,
  path: String,
  extension: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorites;
