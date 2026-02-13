const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const flightRoutes = require("./routes/flight.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();
console.log()

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }
));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Flight Booking API is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
