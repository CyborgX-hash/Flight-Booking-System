const prisma = require("../prismaClient");

const FIVE_MIN = 5 * 60 * 1000;
const TEN_MIN = 10 * 60 * 1000;

exports.handleDynamicPricing = async (flightId) => {
  const now = new Date();

  // Log booking attempt
  await prisma.priceAttempt.create({
    data: { flightId },
  });

  // Get attempts in last 5 minutes
  const recentAttempts = await prisma.priceAttempt.findMany({
    where: {
      flightId,
      createdAt: {
        gte: new Date(now - FIVE_MIN),
      },
    },
  });

  const flight = await prisma.flight.findUnique({
    where: { flight_id: flightId },
  });

  if (!flight) return null;

  // Reset price if last attempt > 10 minutes ago
  const lastAttempt = await prisma.priceAttempt.findFirst({
    where: { flightId },
    orderBy: { createdAt: "desc" },
  });

  if (now - lastAttempt.createdAt > TEN_MIN) {
    await prisma.flight.update({
      where: { flight_id: flightId },
      data: { current_price: flight.base_price },
    });

    return flight.base_price;
  }

  // Apply surge pricing
  if (recentAttempts.length >= 3) {
    const surgedPrice = Math.round(flight.base_price * 1.1);

    await prisma.flight.update({
      where: { flight_id: flightId },
      data: { current_price: surgedPrice },
    });

    return surgedPrice;
  }

  return flight.current_price;
};
