
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var saveButton = document.querySelector("#save-score");
var timer;
var timerCount = 10;
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
        question: "Question 1",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    }, 
    {
        question: "Question 2",
        choices: ["AA", "BB", "CC", "DD"],
        answer: "DD"
    },
    {
        question: "Question 3",
        choices: ["AAA", "BBB", "CCC", "DDD"],
        answer: "CCC"
    }
 ]

var questionCounter = 0;

// Runs when the page loads to pull scoreboard from local storage
function init() {
    getScoreboard();
}

function renderNextQuestion(event) {
    console.log(event.target.textContent);
    console.log(questionArray[questionCounter].answer)
    if (event.target.textContent == questionArray[questionCounter].answer) {
        correctness.textContent = ("Correct!");
    }
        else {
            correctness.textContent = ("Ehh! Wrong!");

            //add incorrect answer logic with timer
        }

    questionCounter++;
    if (questionCounter == questionArray.length) {
        alert("Quiz End");
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


// Function to start the timer, subtracts 15 seconds for each incorrect answer
function startTimer () {
    timerCount = 10;
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
question.textContent = questionArray[0].question;
choice1.textContent = questionArray[0].choices[0];
choice2.textContent = questionArray[0].choices[1];
choice3.textContent = questionArray[0].choices[2];
choice4.textContent = questionArray[0].choices[3];
}

// START BUTTON
startButton.addEventListener("click", startTimer);
// startButton.addEventListener("click", renderNextQuestion);

// SAVE BUTTON
var highscores = JSON.parse(localStorage.getItem("Highscores")) || []

saveButton.addEventListener("click", function(){
    var data = {
        initials: initials.value,
        score: score
    }
    highscores.push(data);
    localStorage.setItem("Highscores", JSON.stringify(highscores));
    scoreSection.classList.add("hidden");
    startButton.classList.remove("hidden");

})


// RESET BUTTON
var resetButton = document.querySelector(".reset-button");

function resetScores() {
  localStorage.clear();
}
// Attaches event listener to Reset button, clears local storage of scoreboard
resetButton.addEventListener("click", resetScores);



// save user initials & score as an object, 
// save object within an array, 
// save that to local storage