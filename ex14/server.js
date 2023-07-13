const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { 
 console.log('Connected to MongoDB');
});
// Set up routes and middleware here 
// Define the Mongoose model 
const BlogPost = mongoose.model('BlogPost', new mongoose.Schema({ 
 title: String, 
 content: String, 
}));
 
 // Define the routes 
app.get('/', async (req, res) => { 
 try { 
 const posts = await BlogPost.find({ });
 res.render("index", { posts });
 } catch (err) { 
 console.log(err);
 } 
});
 
app.get('/post/:id', async (req, res) => { 
 const postId = req.params.id;
 try { 
 const post = await BlogPost.findById({_id: postId});
 res.render("post", { post });
 } catch (err) { 
 console.log(err);
 } 
});
// Start the server 
app.listen(port, () => { 
 console.log(`Server listening on port ${port}`);
});
