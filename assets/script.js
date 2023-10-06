
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var saveButton = document.querySelector("#save-score");
var highScoreBtn = document.querySelector(".hs-button");
var timer;
var timerCount;
var initials = document.querySelector("#input-initials");

var questionSection = document.querySelector("#question-section");
var question = document.querySelector("#question");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var correctness = document.querySelector(".correctness");

var scoreSection = document.querySelector("#score-input");
var score = timerCount;

var questionArray = [ 
    {
        question: "Inside which HTML element do we put the JavaScript",
        choices: ["<script>", "<js>", "<scripting>", "<java>"],
        answer: "<script>"
    }, 
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script js='xxx.js'>", "<script name='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>"],
        answer: "<script src='xxx.js'>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "text('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "funktion myFunktion()", "function: myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "How does a FOR loop start?",
        choices: ["for (i=0, i<=5, i++)", "for i=0, i<=5, i++", "for (i<=5, i++)", "for (i=0; i<=5; i++)"],
        answer: "for (i=0; i<=5; i++)"
    }
 ]

var questionCounter = 0;

function renderNextQuestion(event) {
    console.log(event.target.textContent);
    console.log(questionArray[questionCounter].answer)
    if (event.target.textContent == questionArray[questionCounter].answer) {
        correctness.textContent = ("Correct!");
    }
        else {
            correctness.textContent = ("Ehh! Wrong!");
                if (timerCount < 16) {
                    timerCount = 1;
                }          
                   else {
                        timerCount = (timerCount-15);
        }}

    questionCounter++;
    if (questionCounter == questionArray.length) {
        alert("Quiz Complete");
        questionSection.classList.add("hidden");
        scoreSection.classList.remove("hidden");

        clearInterval(timer);

        // add score input, storage, and high scores page
    }
        else {
    question.textContent = questionArray[questionCounter].question;
    choice1.textContent = questionArray[questionCounter].choices[0];
    choice2.textContent = questionArray[questionCounter].choices[1];
    choice3.textContent = questionArray[questionCounter].choices[2];
    choice4.textContent = questionArray[questionCounter].choices[3];
    }
}

choice1.addEventListener("click", renderNextQuestion);
choice2.addEventListener("click", renderNextQuestion);
choice3.addEventListener("click", renderNextQuestion);
choice4.addEventListener("click", renderNextQuestion);


// Function to start the timer & quiz, subtracts 15 seconds for each incorrect answer
function startTimer () {
    timerCount = 60;
    if (timerCount <= 0) {
        return;
    }
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if(timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000)

startButton.classList.add("hidden");
questionSection.classList.remove("hidden");
highscoresPage.classList.add("hidden");

question.textContent = questionArray[0].question;
choice1.textContent = questionArray[0].choices[0];
choice2.textContent = questionArray[0].choices[1];
choice3.textContent = questionArray[0].choices[2];
choice4.textContent = questionArray[0].choices[3];
}

// START BUTTON
startButton.addEventListener("click", startTimer);


var storedHighscores = JSON.parse(localStorage.getItem("Highscores"));
//  || []
var highscores = [];

function init() {
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }

    renderHighscores();
}

var hsList = document.querySelector("#high-score-info")

function renderHighscores() {
    hsList.innerHTML = "";

    for (var i = 0; i < hsList.length; i++) {
        var hs = highscores[i];

        var li = document.createElement("li");
        li.textContent = hs;

        hsList.appendChild(li);
    }
}

// SAVE BUTTON
saveButton.addEventListener("click", function(){
    var data = {
        initials: initials.value,
        score: timerCount,
    }
    storedHighscores.push(data);
    localStorage.setItem("Highscores", JSON.stringify(storedHighscores));
    scoreSection.classList.add("hidden");
    startButton.classList.remove("hidden");
    highscoresPage.classList.remove("hidden");
})

// HIGH SCORES BUTTON
// stops the timer, hides all cards except HS page, shows Start button
var highscoresPage = document.querySelector(".highscores-page");
function showHS() {
    clearInterval(timer);
    highscoresPage.classList.remove("hidden");
    scoreSection.classList.add("hidden");
    questionSection.classList.add("hidden");
    startButton.classList.remove("hidden");
}
// Attaches event listener to HS button
highScoreBtn.addEventListener("click", showHS);

// RESET BUTTON
//clears local storage, and therefore the HS page
var resetButton = document.querySelector(".reset-button");
function resetScores() {
  localStorage.clear();
}
// Attaches event listener to Reset button
resetButton.addEventListener("click", resetScores);

// Retrieves stored HS and renders it to page on load
init()
console.log(storedHighscores)