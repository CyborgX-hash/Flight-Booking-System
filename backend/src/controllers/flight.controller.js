const axios = require("axios");

let accessToken = null;

// Get Amadeus access token
const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
};

// SEARCH FLIGHTS
exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, date, adults = 1 } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const token = await getAccessToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults,
          currencyCode: "INR",
          max: 10,
        },
      }
    );

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch flights" });
  }
};
