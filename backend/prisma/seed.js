require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});


async function main() {
  // Flights
  await prisma.flight.createMany({
    data: [
      { flight_id: "AI101", airline: "Air India", departure_city: "Delhi", arrival_city: "Mumbai", base_price: 2500, current_price: 2500 },
      { flight_id: "AI102", airline: "Air India", departure_city: "Mumbai", arrival_city: "Delhi", base_price: 2600, current_price: 2600 },
      { flight_id: "IND201", airline: "IndiGo", departure_city: "Bangalore", arrival_city: "Delhi", base_price: 2300, current_price: 2300 },
      { flight_id: "IND202", airline: "IndiGo", departure_city: "Delhi", arrival_city: "Bangalore", base_price: 2400, current_price: 2400 },
      { flight_id: "VST301", airline: "Vistara", departure_city: "Pune", arrival_city: "Kolkata", base_price: 2800, current_price: 2800 },
      { flight_id: "VST302", airline: "Vistara", departure_city: "Kolkata", arrival_city: "Pune", base_price: 2900, current_price: 2900 },
      { flight_id: "SP401", airline: "SpiceJet", departure_city: "Chennai", arrival_city: "Hyderabad", base_price: 2200, current_price: 2200 },
      { flight_id: "SP402", airline: "SpiceJet", departure_city: "Hyderabad", arrival_city: "Chennai", base_price: 2250, current_price: 2250 },
      { flight_id: "AK501", airline: "Akasa Air", departure_city: "Delhi", arrival_city: "Jaipur", base_price: 2000, current_price: 2000 },
      { flight_id: "AK502", airline: "Akasa Air", departure_city: "Jaipur", arrival_city: "Delhi", base_price: 2100, current_price: 2100 }
    ]
  });

  // Wallet
  await prisma.wallet.create({
    data: { balance: 50000 }
  });

  console.log("✅ Flights & Wallet seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
