var score = document.querySelector(".score");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var correct
var wrong

var timerCount;
var initials = "";

// Runs when the page loads to pull scoreboard from local storage
function init() {
    getScoreboard();
}

// Runs to start the game when Start button is clicked
function startQuiz () {
    startButton.disabled = true;
    renderQuiz();
    startTimer();
}

// Function to start the timer, subtracts 15 seconds for each incorrect answer
function startTimer () {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (wrong) && timerCount > 15) {
                timerCount = timerCount-15;
            }
        }
    })
}






// RESET BUTTON
var resetButton = document.querySelector(".reset-button");

function resetScores() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Listens for click on Reset button to reset high scores
resetButton.addEventListener("click", resetScores);