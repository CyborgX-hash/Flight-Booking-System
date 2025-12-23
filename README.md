Flight Booking System – Full-Stack Technical Assignment

This project is an end-to-end Flight Booking System built for the XTechon Full-Stack Developer Technical Assignment.
It demonstrates real-world full-stack development skills including database usage, backend logic, dynamic pricing, wallet handling, and PDF ticket generation using production-ready practices.

📌 Features
✅ Core Features

Database-driven flight search (no static JSON or APIs)

Dynamic surge pricing engine

In-app wallet system

Flight booking with validations

PDF ticket generation

Booking history page

⭐ Bonus Enhancements

Sorting & filtering flights

Surge pricing indicators

Responsive UI

Authentication (login/register)

Clean Git commit history

🏗️ Tech Stack
Frontend

React / Next.js

TailwindCSS / Bootstrap

Axios / Fetch API

Backend

Node.js

Express.js

Database

MongoDB / PostgreSQL / MySQL

Other Tools

PDF generation (pdfkit / jsPDF)

UUID / NanoID (PNR generation)

dotenv for environment variables

📂 Project Structure
flight-booking-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   └── index.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── styles/
│   └── package.json
│
├── README.md
└── .env.example

🧠 Functional Modules
1️⃣ Flight Search Module

Flights are stored in the database

10–20 seeded flights

Each flight contains:

flight_id

airline

departure_city

arrival_city

base_price (₹2000–₹3000)

Every search returns 10 flights fetched directly from the database

2️⃣ Dynamic Pricing Engine

If a user tries to book the same flight 3 times within 5 minutes

Flight price increases by 10%

Surge pricing is temporary

After 10 minutes, price resets to the original base_price

3️⃣ Wallet System

Default wallet balance: ₹50,000

Final ticket price is deducted on successful booking

Booking is blocked if wallet balance is insufficient

Clear validation error is shown for low balance

4️⃣ Ticket PDF Generation

A PDF ticket is generated after every successful booking

PDF Includes:

Passenger name

Airline & flight ID

Route (Departure → Arrival)

Final price paid

Booking date & time

Unique PNR

5️⃣ Booking History

Displays all past bookings

Each booking shows:

Flight details

Amount paid

Booking date

PNR

Option to re-download ticket PDF
