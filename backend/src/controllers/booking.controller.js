const prisma = require("../prismaClient");
const { handleDynamicPricing } = require("../utils/pricingEngine");
const { generateTicketPDF } = require("../utils/pdfGenerator");
const { v4: uuidv4 } = require("uuid");

exports.bookFlight = async (req, res) => {
  try {
    const { passengerName, flightId } = req.body;

    if (!passengerName || !flightId) {
      return res.status(400).json({ error: "Missing booking details" });
    }

    // Check flight exists
    const flight = await prisma.flight.findUnique({
      where: { flight_id: flightId },
    });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Dynamic pricing
    const updatedPrice = await handleDynamicPricing(flightId);

    if (!updatedPrice) {
      return res.status(400).json({ error: "Pricing error" });
    }

    // Wallet check
    const wallet = await prisma.wallet.findUnique({ where: { id: 1 } });

    if (!wallet || wallet.balance < updatedPrice) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Deduct wallet (NO TRANSACTION – Accelerate compatible)
    await prisma.wallet.update({
      where: { id: 1 },
      data: { balance: wallet.balance - updatedPrice },
    });

    // Create booking
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

    // Generate PDF ticket
    await generateTicketPDF(booking);

    return res.status(201).json({
      success: true,
      booking,
      ticketUrl: `/tickets/${booking.pnr}.pdf`,
    });

  } catch (err) {
    console.error("❌ Booking Error:", err);
    return res.status(500).json({
      error: "Booking failed",
      details: err.message,
    });
  }
};
