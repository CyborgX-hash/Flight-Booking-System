const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateTicketPDF = (booking) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const filePath = path.join(
      __dirname,
      "../../tickets",
      `${booking.pnr}.pdf`
    );

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text("✈️ Flight Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Passenger Name: ${booking.passengerName}`);
    doc.text(`Airline: ${booking.airline}`);
    doc.text(`Flight ID: ${booking.flightId}`);
    doc.text(`Route: ${booking.route}`);
    doc.text(`Price Paid: ₹${booking.pricePaid}`);
    doc.text(`PNR: ${booking.pnr}`);
    doc.text(`Booking Date: ${new Date(booking.bookedAt).toLocaleString()}`);

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
