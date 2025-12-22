const prisma = require("../prismaClient");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    const flights = await prisma.flight.findMany({
      where: {
        ...(from && { departure_city: from }),
        ...(to && { arrival_city: to }),
      },
      take: 10,
    });

    return res.status(200).json({
      success: true,
      count: flights.length,
      flights,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
