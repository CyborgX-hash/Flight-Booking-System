const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings } = require("../controllers/booking.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, createBooking);
router.get("/", auth, getMyBookings);

module.exports = router;
