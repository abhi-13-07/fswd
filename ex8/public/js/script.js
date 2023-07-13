const startQuiz = document.getElementById("start-quiz");
const topicInput = document.getElementById("topic");
const quizContainer = document.getElementById("quiz-container");
const resultElement = document.getElementById("result");
const answers = {};
let topic = "";
document.addEventListener("DOMContentLoaded", async () => { 
 resultElement.innerText = "";
 const topics = await fetchTopics();
 topic = topics[0];
 displayTopics(topics);
});
topicInput.addEventListener("change", (e) => { 
 topic = e.target.value;
});
startQuiz.addEventListener("click", async () => { 
 const questions = await fetchQuestions(topic);
 displayQuestions(questions);
});
async function fetchTopics() { 
 try { 
 const res = await fetch("http://localhost:3000/api/topics");
 const { topics } = await res.json();
 return topics;
 } catch (err) { 
 console.log(err);
 } 
} 
async function fetchQuestions(topic) { 
 try { 
 const res = await fetch(`http://localhost:3000/api/questions/${topic}`) 
 const { questions } = await res.json();
 return questions;
 } catch (err) { 
 console.log(err);
 } 
} 
function displayTopics(topics) { 
 topics.forEach(topic => { 
 const option = document.createElement("option");
 option.innerText = topic;
 topicInput.appendChild(option);
 });
} 
function displayQuestions(questions) { 
 quizContainer.innerHTML = "";
 questions.forEach(({question, options}, index) => { 
 const questionContainer = document.createElement("div");
 questionContainer.classList.add("card");
 const b = document.createElement("b");
 b.innerText = `${index + 1}. ${question}`;
 b.classList.add("card-title");
 const optionsContainer = document.createElement("div");
 optionsContainer.id = "options";
 options.forEach((option, index) => { 
 const field = document.createElement("div");
 const input = document.createElement("input");
 const label = document.createElement("label");
 
 input.type = "radio";
 input.id = option;
 input.value = option;
 input.name = question;
 input.addEventListener("change", handleInputChange);
 label.innerText = `${index + 1}) ${option}`;
 label.htmlFor = option;
 field.id=question;
 field.appendChild(input);
 field.appendChild(label);
 optionsContainer.appendChild(field);
 });
 questionContainer.appendChild(b);
 questionContainer.appendChild(optionsContainer);
 quizContainer.appendChild(questionContainer);
 });
 
 const button = document.createElement("button");
 button.classList.add("btn-primary");
 button.innerText = "Submit";
 button.addEventListener("click", handleSubmit);
 
 quizContainer.appendChild(button);
 quizContainer.style.display = "block";
} 
async function handleSubmit(e) { 
 try { 
 const res = await fetch(`http://localhost:3000/api/questions/${topic}/submit`, { 
 method: "POST", 
 headers: { 
 'Content-Type': 'application/json', 
 }, 
 body: JSON.stringify({answers}), 
 });
 const {result, totalScore} = await res.json();
 displayResult(result, totalScore);
 } catch (err) { 
 console.log(err);
 } 
} 
function handleInputChange(e) { 
 const { name, value } = e.target;
 answers[name] = value;
 console.log(answers);
} 
function displayResult(result, totalScore) { 
 result.forEach(result => { 
 const field = document.getElementById(result.question).parentElement;
 field.innerHTML = "";
 const p = document.createElement("p");
 if (result.status === "wrong") { 
 p.classList.add("error");
 } else { 
 p.classList.add("success");
 } 
 p.innerText = `Correct Answer is option ${result.correctAnswer}, Score: ${result.score}`;
 field.appendChild(p);
 });
 const button = document.createElement("button");
 button.classList.add("btn-secondary");
 button.innerText = "Restart";
 button.addEventListener("click", handleRestart);
 quizContainer.appendChild(button);
 
 resultElement.innerText = `Total Score ${totalScore}`;
} 
async function handleRestart() { 
 resultElement.innerText = "";
 const questions = await fetchQuestions(topic);
 displayQuestions(questions);
}