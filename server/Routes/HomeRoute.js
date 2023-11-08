const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/GenreController")

router.get("/genre", GenreController.getGenre)

module.exports = router;