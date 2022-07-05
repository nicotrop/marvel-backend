//Import des packages
const express = require("express");
const axios = require("axios");
const router = express.Router();

//Import du middleware
const pagination = require("../middleware/pagination");

const api_key = process.env.API_KEY;

router.get("/character", async (req, res) => {
  const results = pagination(req.query.limit, req.query.page);
  const [limit, skip] = results;

  let name = "";
  if (req.query.name) {
    name = req.query.name;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${api_key}&limit=${limit}&skip=${skip}&name=${name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/character/:characterid", async (req, res) => {
  const characterID = req.params.characterid;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterID}?apiKey=${api_key}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
