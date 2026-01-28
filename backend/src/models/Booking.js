const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        bookingReference:{
            type:String,
            required:true,
            unique:true
        },
        flight:{
            airline: String,
            flightNumbers: [String],
            origin: String,
            destination: String,
            departureTime: String,
            arrivalTime: String,
            duration: String,

        },
        passengers: [
            {
              name: {
                type: String,
                required: true,
              },
              age: {
                type: Number,
                required: true,
              },
            },
        ],
        price: {
            total: {
              type: Number,
              required: true,
            },
            currency: {
              type: String,
              default: "INR",
            },
        },
        status:{
            type:String,
            enum:["CONFIRMED","CANCELLED",],
            default:"CONFIRMED"
        },
    },
    {timestamps:true}
)
module.exports = mongoose.model("Booking",bookingSchema)