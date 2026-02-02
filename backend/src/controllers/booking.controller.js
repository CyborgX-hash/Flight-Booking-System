const Booking = require("../models/Booking");


exports.createBooking = async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { flight, passengers, price } = req.body;

    if (!flight || !passengers?.length || !price?.total) {
      return res.status(400).json({ message: "Invalid booking data" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      bookingReference: "FB" + Date.now(),
      flight: {
        airline: flight.airline,
        flightNumbers: flight.flightNumbers,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration,
      },
      passengers,
      price: {
        total: price.total,
        currency: price.currency || "INR",
      },
      status: "CONFIRMED",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Booking error:", error.message);
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
