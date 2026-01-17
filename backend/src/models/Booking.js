const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        bookingReferences:{
            type:String,
            required:true,
            unique:true
        },
        flight:{
            airline:String,
            flightNumber:[String],
            origin:String,
            destination:String,
            arrivalTime:String,
            duration:String,
        },
        price:{
            type:Number,
            currency:String
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