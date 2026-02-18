
AirYatra is a full-stack flight booking web application built using the **MERN stack**.  
It allows users to search domestic and international flights in real-time, add passengers, complete bookings securely, and manage their booking history.

The application integrates the **Amadeus Flight Offers API** to fetch live flight data and demonstrates a complete booking lifecycle from authentication to checkout confirmation.

---



AirYatra simulates a real-world airline booking experience by implementing:

- Secure authentication
- Real-time flight search
- Passenger management
- Booking confirmation
- Persistent booking history
- Backend validation and database indexing

This project showcases strong full-stack development skills including API integration, authentication, schema design, and debugging production-level issues.

---


## 🔐 1. Authentication System
- User Signup & Login
- JWT-based authentication
- Protected routes (only logged-in users can book or view bookings)
- Token-based authorization middleware

---

## ✈️ 2. Flight Search (Real-Time Data)

- Integrated with **Amadeus Flight Offers API**
- Supports domestic & international flights
- Airport auto-suggestions (City → IATA Code)
- Dynamic flight results display:
  - Airline
  - Route
  - Stops
  - Duration
  - Price

---

## 👥 3. Passenger Management

- Add multiple passengers
- Remove passengers dynamically
- Frontend validation (Name & Age required)
- Backend validation (Minimum 1 passenger required)
- Price auto-calculation based on passenger count

---

## 🧾 4. Booking System

- Generates unique booking reference
- Stores:
  - Flight details
  - Passenger details
  - Price & currency
  - Booking status
- MongoDB persistence
- Booking confirmation (Checkout Success page)

---

## 📂 5. My Bookings Dashboard

- Displays all bookings for logged-in user
- Sorted by latest booking
- Shows:
  - Route
  - Flight numbers
  - Duration
  - Total price
  - Booking reference
  - Status (CONFIRMED / CANCELLED)

---

## 🧠 Technical Highlights

- JWT authentication middleware
- MongoDB schema validation
- Unique index for booking reference
- Passenger array validation
- Proper API error handling
- Production-level debugging (MongoDB index conflict resolution)
- Clean request-response separation (Routes → Controllers → Models)

---

# 🛠️ Tech Stack

## Frontend
- React (Create React App)
- React Router
- Axios
- Inline CSS styling

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)

## Third-Party API
- Amadeus Flight Offers API

---


