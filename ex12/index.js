var express = require("express"); 
var app = express(); 
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose"); 
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://127.0.0.1:27017/ex5"); 
var studentsSchema = new mongoose.Schema({ 
 fname: String, 
 lname: String, 
 rollno: Number 
});
var User = mongoose.model("User", studentsSchema);
app.get("/", (req, res) => { 
 res.sendFile(__dirname + "/index.html"); 
});
app.post("/addname", (req, res) => { 
 var myData = new User(req.body); 
 myData.save() 
 .then(item => { 
 res.send("database saved"); 
 }) 
 .catch(err => { 
 res.status(400).send("Unable to save to database");
 });
});
app.listen(port, () => { 
 console.log("Server listening on port " + port); 
});
