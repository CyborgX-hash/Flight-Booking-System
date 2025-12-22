const express = require("express");
const router = express.Router();
const { getBookingHistory } = require("../controllers/history.controller");

router.get("/", getBookingHistory);

module.exports = router;
