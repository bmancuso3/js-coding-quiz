var score = document.querySelector(".score");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var questionSection = document.querySelector("#question-section")
var question = document.querySelector("#question");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");

var correct
var wrong

var timer;
var timerCount = 5;
var initials = "";

var questionArray = ""

// Runs when the page loads to pull scoreboard from local storage
function init() {
    getScoreboard();
}

function renderNextQuestion() {
    question.textContent = "Question 2";
    choice1.textContent = "Answer A";
}

choice1.addEventListener("click", renderNextQuestion);
choice2.addEventListener("click", renderNextQuestion);
choice3.addEventListener("click", renderNextQuestion);
choice4.addEventListener("click", renderNextQuestion);


// Function to start the timer, subtracts 15 seconds for each incorrect answer
function startTimer () {
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
questionSection.classList.remove("hidden");
}

// START BUTTON
// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);


// RESET BUTTON
var resetButton = document.querySelector(".reset-button");

function resetScores() {
  localStorage.clear();
}
// Attaches event listener to Reset button, clears local storage of scoreboard
resetButton.addEventListener("click", resetScores);