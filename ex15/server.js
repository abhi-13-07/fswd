const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const bookSchema = new mongoose.Schema({ 
 title: { 
 type: String, 
 trim: true 
 }, 
 description: { 
 type: String 
 }, 
 author: { 
 type: String, 
 required: true 
 }, 
 publication: { 
 type: String, 
 required: true 
 }, 
 price: { 
 type: String, 
 required: true 
 }, 
 publishedOn: { 
 type: Date, 
 default: Date.now 
 } 
});
const Book = mongoose.model("book", bookSchema);
async function connectDB() { 
const { connection } = await mongoose.connect("mongodb://127.0.0.1:27017/book");
 console.log(`Successfully connected to Database ${connection.host}`);
} 
app.get("/books", async (req, res) => { 
 try { 
 const books = await Book.find({});
 res.status(200).json({ 
 books 
 });
 } catch (err) { 
 res.status(500).json({ 
 message: "Internal Server error" 
 });
 } 
});
app.post("/book", async (req, res) => { 
const body = req.body;
const book = new Book(body);
 try { 
 await book.save();
 res.status(201).json({ 
 message: `Successfully saved book with the title ${book.title}` 
 });
 } catch (err) { 
 console.log(err);
 res.status(500).json({ 
 message: "Internal Server error" 
 });
 } 
});
app 
 .route("/book/:id") 
 .put(async (req, res) => { 
 const { id } = req.params;
 try { 
 const book = await Book.findByIdAndUpdate(id, req.body);   
 return res.status(200).json({ 
 message: "Successfully updated the book!" 
 });
 } catch (err) { 
 res.status(500).json({ 
 message: "Internal Server error" 
 });
 } 
 }) 
 .delete(async (req, res) => { 
 const { id } = req.params;
try { 
 const bookQuery = await Book.findByIdAndDelete(id);
 return res.status(200).json({ 
 message: `Successfully deleted book with title ${bookQuery.title}` 
 });
 } catch (err) { 
 res.status(500).json({ 
 message: "Internal Server error" 
 });
 } 
});
app.listen(3000, () => { 
 console.log("Server started on port 3000");
 connectDB();
});
