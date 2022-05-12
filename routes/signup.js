const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//Import du model User
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.fields;
  console.log(username, email, password);

  res.json(req.fields);
});

module.exports = router;
