const express = require("express");
const cors = require("cors");
const path = require("path");

const flightRoutes = require("./routes/flights.routes");
const bookingRoutes = require("./routes/booking.routes");
const historyRoutes = require("./routes/history.routes");
const walletRoutes = require("./routes/wallet.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://flight-booking-system-beryl.vercel.app",
      "https://flight-booking-system-3q70p2vxq-cyborgx-hashs-projects.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/tickets",
  express.static(path.resolve(__dirname, "..", "tickets"))
);

app.use("/flights", flightRoutes);
app.use("/book", bookingRoutes);
app.use("/history", historyRoutes);
app.use("/wallet", walletRoutes);

app.get("/", (req, res) => {
  res.status(200).send("✈️ Flight Booking API Running");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
