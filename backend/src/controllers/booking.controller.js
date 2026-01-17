const Booking = require("../models/Booking");
const generateBookingRef = ()=>{
    return "FB-"+Math.random().toString(36).substring(2,8).toUpperCase()
}
exports.createBooking = async(req,res)=>{
    try{
        const {flight,price} = req.body
        if(!flight || !price){
            return res.status(400).json({message:"Missing required booking details"})
        }
        const booking = await Booking.create({
            user:req.user.id,
            bookingReferences:generateBookingRef(),
            flight,
            price,
        })
        res.status(201).json({message:"Booking confirmed",booking})
    }
    catch(error){
        res.status(500).json({message:"error.message"})
    }
}

exports.getMyBookings = async(req,res)=>{
    try{
        const Booking = await Booking.find({user:req.user.id}).sort({createdAt:-1})
        res.status(200).json(Booking)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}