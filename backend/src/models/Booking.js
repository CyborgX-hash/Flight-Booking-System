const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },

    flight: {
      airline: { type: String, required: true },
      flightNumbers: { type: [String], required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      departureTime: { type: String, required: true },
      arrivalTime: { type: String, required: true },
      duration: { type: String, required: true },
    },

    passengers: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          age: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [
        (val) => val.length > 0,
        "At least one passenger is required",
      ],
      required: true,
    },

    price: {
      total: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
