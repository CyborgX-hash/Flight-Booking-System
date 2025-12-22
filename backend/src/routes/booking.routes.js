const express = require("express");
const router = express.Router();
const { bookFlight } = require("../controllers/booking.controller");

router.post("/", bookFlight);

module.exports = router;
