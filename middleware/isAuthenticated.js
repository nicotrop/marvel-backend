const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const app = express();

const User = require("../models/User");

//MiddleWare authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    if (!user) {
      res.status(400).json({
        error: "Unauthorized!",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = isAuthenticated;
