const axios = require("axios");

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error("Amadeus token error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with flight service");
  }
};

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({
        message: "origin, destination and date are required",
      });
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
          adults: 1, // 
          currencyCode: "INR",
          max: 10,
        },
      }
    );

    return res.status(200).json(response.data.data);
  } catch (error) {
    console.error(
      "Amadeus flight error:",
      error.response?.data || error.message
    );

    const amadeusError = error.response?.data?.errors?.[0];
    if (amadeusError) {
      return res.status(error.response.status || 400).json({
        message: `${amadeusError.title}: ${amadeusError.detail}`,
      });
    }

    return res.status(502).json({
      message:
        "Flight service temporarily unavailable. Please try again in a moment.",
    });
  }
};
