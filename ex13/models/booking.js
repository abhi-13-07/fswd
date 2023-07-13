const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({ 
 customerName: { 
 type: String, 
 required: true, 
 }, 
 address: { 
 type: String, 
 required: true, 
 }, 
 phoneNumber: { 
 type: String, 
 required: true, 
 }, 
 gasType: { 
 type: String, 
 required: true, 
 }, 
 createdAt: { 
 type: Date, 
 default: Date.now, 
 }, 
});
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;