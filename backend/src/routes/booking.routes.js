const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const {createBooking,getMyBookings} = require("../controllers/booking.controller")
router.post("/",authMiddleware,createBooking)
router.get("/my-bookings",authMiddleware,getMyBookings)
module.exports = router