const prisma = require("../prismaClient");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    const flights = await prisma.flight.findMany({
      where: {
        AND: [
          from
            ? {
                departure_city: {
                  equals: from,
                  mode: "insensitive",
                },
              }
            : {},
          to
            ? {
                arrival_city: {
                  equals: to,
                  mode: "insensitive", // 
                },
              }
            : {},
        ],
      },
      take: 10,
    });

    return res.status(200).json({
      success: true,
      count: flights.length,
      flights,
    });
  } catch (error) {
    console.error("Search Flights Error:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
