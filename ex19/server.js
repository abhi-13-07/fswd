const express = require("express");
const mongoose = reqruire("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/express-mongodb-demo");
        console.log("Connected to DB");
    } catch(err) {
        console.log(err);
    }
}

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    roll: {
        type: Number,
    }
});

const Student = mongoose.model("student", studentSchema);

app.get("/", (req, res) => {
    res.sendFile("./index.html");
});

app.post("/", async (req, res) => {
    const { name, email, rollNo } = req.body;

    const newStudent = new Student({
        name,
        email,
        rollNo: parseInt(rollNo)
    });

    try {
        await newStudent.save();
        res.send("Successfully saved student");
    } catch (err) {
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
    connectDB();
})