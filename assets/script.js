var score = document.querySelector(".score");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var correct
var wrong

var timer;
var timerCount = 5;
var initials = "";

// Runs when the page loads to pull scoreboard from local storage
function init() {
    getScoreboard();
}

// Runs to start the game when Start button is clicked
// function startQuiz () {
//     startButton.disabled = true;
//     renderQuiz();
//     startTimer();
// }

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