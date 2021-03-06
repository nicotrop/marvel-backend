const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorites", {
  title: String,
  type: String,
  path: String,
  extension: String,
  description: String,
  elementID: String,
  dbID: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorites;
