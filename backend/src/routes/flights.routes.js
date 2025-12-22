const express = require("express");
const router = express.Router();
const { searchFlights } = require("../controllers/flight.controller");

router.get("/", searchFlights);

module.exports = router;

