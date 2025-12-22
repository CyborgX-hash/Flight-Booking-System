const express = require("express");
const cors = require("cors");
const path = require("path");

const flightRoutes = require("./routes/flights.routes");
const bookingRoutes = require("./routes/booking.routes");
const historyRoutes = require("./routes/history.routes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- STATIC FILES (IMPORTANT) ---------- */
// tickets folder is at: backend/tickets
app.use(
  "/tickets",
  express.static(path.resolve(__dirname, "..", "tickets"))
);

/* ---------- API ROUTES ---------- */
app.use("/flights", flightRoutes);
app.use("/book", bookingRoutes);
app.use("/history", historyRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.status(200).send("✈️ Flight Booking API Running");
});

/* ---------- 404 HANDLER (LAST) ---------- */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
