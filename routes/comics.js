//Import des packages
const express = require("express");
const axios = require("axios");
const router = express.Router();

//Import du middleware
const pagination = require("../middleware/pagination");

const api_key = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  const results = pagination(req.query.limit, req.query.page, req.query.title);
  const [limit, skip] = results;

  let title = "";
  if (req.query.title) {
    title = req.query.title;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${api_key}&limit=${limit}&skip=${skip}&title=${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

router.get("/comics/:characterid", async (req, res) => {
  const characterID = req.params.characterid;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${api_key}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
