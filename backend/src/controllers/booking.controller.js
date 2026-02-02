const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    console.log("Booking payload:", req.body);
    console.log("User:", req.user);
    const booking = await Booking.create({
      user: req.user.id, // from auth middleware
      bookingReference: "FB" + Date.now(), // simple unique ref
      flight: req.body.flight,
      passengers: req.body.passengers,
      price: req.body.price,
      status: "CONFIRMED",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
  console.log("Booking payload:", req.body);
console.log("User:", req.user);
};
exports.getMyBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
      res.status(200).json(bookings);
    } catch (error) {
      console.error("❌ Fetch bookings error:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  };

