const express = require('express');
const app = express();
const port = 3000;
// Serve static files from the 'public' directory 
app.use(express.static(__dirname + '/public'));
// Parse JSON requests 
app.use(express.json());
const questions = require('./questions.json');
app.get("/", (req, res) => { 
 res.sendFile(__dirname + "/views/index.html");
});
app.get("/api/topics", (req, res) => { 
 const topics = Object.keys(questions);
 res.status(200).json({topics});
});
// Endpoint to fetch questions and options for a specific topic 
app.get('/api/questions/:topic', (req, res) => { 
 const topic = req.params.topic;
 if (questions.hasOwnProperty(topic)) { 
 res.json(questions[topic]);
 } else { 
 res.status(404).json({ error: 'Topic not found' });
 } 
});
// Endpoint to calculate the score based on user answers 
app.post("/api/questions/:topic/submit", (req, res) => { 
 const topic = req.params.topic;
 const { answers } = req.body;
 const result = [];
 const quests = questions[topic].questions;
 let totalScore = 0;
 for (let quest of quests) { 
 if (quest.options.indexOf(answers[quest.question]) + 1 !== quest.correctAnswer) { 
 result.push({ question: quest.question, correctAnswer: quest.correctAnswer, status: 
"wrong", score: 0});
 } else { 
 result.push({ question: quest.question, correctAnswer: quest.correctAnswer, status: 
"correct", score: 10});
 totalScore += 10;
 } 
 } 
 return res.status(200).json({ 
 result, 
 totalScore 
 });
}) 
// Start the server 
app.listen(port, () => { 
 console.log(`Server listening on port ${port}`);
});
