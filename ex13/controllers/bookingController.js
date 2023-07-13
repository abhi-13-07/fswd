const Booking = require("../models/booking");
// Controller for creating a new booking 
exports.createBooking = (req, res) => { 
 const { customerName, address, phoneNumber, gasType } = req.body;
 const newBooking = new Booking({ 
 customerName, 
 address, 
 phoneNumber, 
 gasType, 
 });
 newBooking 
 .save() 
 .then((booking) => { 
 res.json(booking);
 }) 
 .catch((err) => { 
 res.status(500).json({ error: "Error creating booking" });
 });
};
