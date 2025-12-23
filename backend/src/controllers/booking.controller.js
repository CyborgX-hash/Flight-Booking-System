const prisma = require("../prismaClient");
const { handleDynamicPricing } = require("../utils/pricingEngine");
const { generateTicketPDF } = require("../utils/pdfGenerator");
const { v4: uuidv4 } = require("uuid");

exports.bookFlight = async (req, res) => {
  try {
    const { passengerName, flightId } = req.body;

    /* ---------- VALIDATION ---------- */
    if (!passengerName || !flightId) {
      return res.status(400).json({
        success: false,
        error: "Passenger name and flight ID are required",
      });
    }

    /* ---------- FLIGHT CHECK ---------- */
    const flight = await prisma.flight.findUnique({
      where: { flight_id: flightId },
    });

    if (!flight) {
      return res.status(404).json({
        success: false,
        error: "Flight not found",
      });
    }

    /* ---------- DYNAMIC PRICING ---------- */
    const updatedPrice = await handleDynamicPricing(flightId);

    if (!updatedPrice || updatedPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Failed to calculate flight price",
      });
    }

    /* ---------- WALLET CHECK ---------- */
    const wallet = await prisma.wallet.findUnique({
      where: { id: 1 },
    });

    if (!wallet) {
      return res.status(500).json({
        success: false,
        error: "Wallet not found",
      });
    }

    if (wallet.balance < updatedPrice) {
      return res.status(400).json({
        success: false,
        error: "Insufficient wallet balance",
        balance: wallet.balance,
        required: updatedPrice,
      });
    }

    /* ---------- WALLET DEDUCTION ---------- */
    const updatedWallet = await prisma.wallet.update({
      where: { id: 1 },
      data: {
        balance: wallet.balance - updatedPrice,
      },
    });

    /* ---------- CREATE BOOKING ---------- */
    const booking = await prisma.booking.create({
      data: {
        passengerName,
        flightId: flight.flight_id,
        airline: flight.airline,
        route: `${flight.departure_city} → ${flight.arrival_city}`,
        pricePaid: updatedPrice,
        pnr: uuidv4().slice(0, 8).toUpperCase(),
      },
    });

    /* ---------- PDF TICKET ---------- */
    await generateTicketPDF(booking);

    /* ---------- SUCCESS RESPONSE ---------- */
    return res.status(201).json({
      success: true,
      message: "Flight booked successfully",
      booking,
      walletBalance: updatedWallet.balance, // 🔥 VERY IMPORTANT
      ticketUrl: `/tickets/${booking.pnr}.pdf`,
    });

  } catch (err) {
    console.error("❌ Booking Error:", err);

    return res.status(500).json({
      success: false,
      error: "Booking failed due to server error",
    });
  }
};
