const express = require("express");
const router = express.Router();
const { searchFlights } = require("../controllers/flight.controller");
const authMiddleware = require("../middlewares/auth");

router.get("/search", authMiddleware, searchFlights);

module.exports = router;
