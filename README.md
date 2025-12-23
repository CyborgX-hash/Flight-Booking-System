XTechon – Full‑ Stack Developer Technical Assignment
Project: Flight Booking System (End‑to‑End)
This assignment is designed to evaluate your full‑stack development skills, code quality,
architectural thinking, and ability to implement real‑world features. Please ensure your
submission reflects professional, production‑ready practices.
1. Flight Search Module (Database Required)
You must build a database‑driven flight search system. Static JSON, random generation, or
external APIs are strictly prohibited.
 Requirements:
 Seed 10–20 flights into your database (MongoDB / MySQL / PostgreSQL).
 Each flight must include: flight_id, airline, departure_city, arrival_city, base_price
(₹2000–₹3000).
 Every search must return 10 flights fetched directly from the database.
2. Dynamic Pricing Engine
Implement surge pricing based on booking attempts within defined time windows.
 Rules:
10%.
 If a user tries to book the same flight 3 times within 5 minutes, increase its price by
 After 10 minutes, the price must reset to its original base_price.
3. Wallet System
Simulate an in‑app wallet to handle ticket purchases.
 Requirements:
 Default wallet balance: ₹50,000.
 Deduct the final price upon successful booking.
 If the wallet balance is insufficient, show a clear validation error.
4. Ticket PDF Generation
Generate a downloadable PDF ticket after every successful booking.
 The PDF must include:
 Passenger name
 Airline & Flight ID
 Route (Departure → Arrival)
 Final price paid
 Booking date & time
 Unique PNR
5. Booking History Page
Create a page displaying complete booking history.
 Each booking must show:
 Flight details
 Amount paid
 Booking date
 PNR
 Button to download the ticket again
Bookings may be stored either in the database (preferred) or in browser local storage
(acceptable).
Optional Enhancements (Bonus Points)
 Sorting & filtering flights
 Surge pricing indicators / countdown timers
 Responsive UI with TailwindCSS / Bootstrap
 Basic authentication (login/register)
 Dockerized setup
 Clean and meaningful Git commit history
 Search by departure/arrival cities
Submission Requirements
 GitHub Repository URL
 README with clear setup & run instructions
 Short demo video (optional)
 Live deployment link (optional but preferred)
Recommended Technology Stack (Optional)
 Frontend: React / Next.js / Angular
 Backend: Node.js (Express) / Python (FastAPI)
 Database: MongoDB / MySQL / PostgreSQL
 UI: TailwindCSS / Bootstrap
 State Management: Redux / Context API / NgRx
Evaluation Criteria
 Code quality & project structure
 UI/UX & overall presentation
 Effective use of the database
 Correct implementation of dynamic pricing
 Wallet functionality & validations
 PDF ticket generation
 Error handling
 Clarity of README
 Bonus enhancements
Objective
Build a clean, functional, and production‑ready flight booking application that demonstrates
your technical depth, creativity, and ability to deliver real features end‑to‑end.
Good luck — build something exceptional!
