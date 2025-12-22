const prisma = require("../prismaClient");

exports.getBookingHistory = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { bookedAt: "desc" },
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch booking history" });
  }
};
