const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
// Configure body-parser middleware 
app.use(bodyParser.json());
// Connect to MongoDB 
mongoose 
 .connect("mongodb://127.0.0.1:27017/gas_booking", { 
 useNewUrlParser: true, 
 useUnifiedTopology: true, 
 }) 
 .then(() => { 
 console.log("Connected to MongoDB");
 }) 
 .catch((err) => { 
 console.error("Error connecting to MongoDB:", err);
 });
// Set up routes and middleware here 
const bookingController = require("./controllers/bookingController");
// Create a new booking 
app.post("/bookings", bookingController.createBooking);
// Start the server 
app.listen(port, () => { 
 console.log(`Server listening on port ${port}`);
});