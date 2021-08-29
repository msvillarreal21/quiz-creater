//array of an object to store the quiz Q/A 
var questions = [{
    Que: "Which type of file allows you to style the page?",
    Opt: ["CSS", "Javascript", "Html", "C++"],
    Ans: "CSS"
},
{
    Que: "How do you comment in CSS?",
    Opt: ["/**/", "You can't comment", "!", "//"],
    Ans: "/**/"
},
{
    Que: "Question 5: The logical operator that represents 'or' is ____.",
    Opt: ["||", "OR", "&&", "==="],
    Ans: "||"
},
{
    Que: "What is error 404 mean?",
    Opt: ["User Error", "Server Error"],
    Ans: "User Error"
},
{
    Que: "Which of the following function of String object combines the text of two strings and returns a new string?",
    Opt: ["add()", "concat()", " merge()", "append()"],
    Ans: "concat()"
}
]


var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//when user clicks start button timer should be started
function start() {
    document.getElementById("quizBody").innerHTML = " ";

    timeLeft = questions.length * 15;
    document.querySelector("#timeLeft").textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.querySelector("#timeLeft").textContent = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            document.getElementById("quizBody").innerHTML = " ";

            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quiEl = document.getElementById("quizBody");

    var h2El = document.createElement("h2");
    h2El.textContent = "Game over!";
    quiEl.append(h2El);

    var h3El = document.createElement("h3");
    h3El.textContent = "You got a " + score + "/"+questions.length*20;
    quiEl.append(h3El);

    var h3El2 = document.createElement("h3");
    h3El2.textContent = "That means you got " + score / 20 + " questions correct";
    quiEl.append(h3El2);

    var Firstname = document.createElement("input");
    Firstname.setAttribute("type", "text");
    Firstname.setAttribute("id", "name");

    Firstname.placeholder = "Enter your intials"
    quiEl.append(Firstname);

    //set score button element
    var scoreBtn = scoreBtn = document.createElement("Button");
    scoreBtn.setAttribute("id", "setscore")
    scoreBtn.textContent = "Set score";
    quiEl.append(scoreBtn);


    scoreBtn.addEventListener("click", function () {
        setScore();
    });
   

}
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("playerName", document.getElementById('name').value);
    alert("Saved")
    //getScore();
}


//store the scores on local storage

function getScore() {

    var quizBodyEl = document.getElementById("quizBody");
    var h2 = document.createElement("h2");
    h2.setAttribute("id","getplayername")

    h2.textContent = localStorage.getItem("playerName") + "'s highscore is:";
    quizBodyEl.append(h2);
    var h1 = document.createElement("h1");
    h1.setAttribute("id","gethighscore")
    h1.textContent = localStorage.getItem("highscore");
    quizBodyEl.append(h1);

    var clearStorage = document.createElement("Button");
    clearStorage.textContent = "clear highscore";
    quizBodyEl.append(clearStorage);
    clearStorage.addEventListener("click", function () {
    clearScore();
    });
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("playerName", "");
document.getElementById("gethighscore").textContent="";
document.getElementById("getplayername").textContent="";

}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15;
    document.getElementById("quizBody").innerHTML = " ";
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    document.getElementById("quizBody").innerHTML = " ";
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    else {
        var quizContent = document.getElementById("quizBody");
        var h2 = document.createElement("h2");
        h2.textContent = questions[currentQuestion].Que;
        quizContent.append(h2);
        var ol = document.createElement("ol");
        ol.setAttribute("id", "Optionslist")
        quizContent.append(ol);
        var showans=document.createElement('div');

        for (var i = 0; i < questions[currentQuestion].Opt.length; i++) {
            showans.textContent="";
            var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
            buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].Opt[i]);
            if (questions[currentQuestion].Opt[i] == questions[currentQuestion].Ans) {
                buttonCode = buttonCode.replace("[ANS]", "correct()");
            } else {
                buttonCode = buttonCode.replace("[ANS]", "incorrect()");
            }
          
            var li = document.createElement("li");
            li.innerHTML = buttonCode;
            ol.append(li);
            quizContent.append(ol);
            ol.append(showans);
        }
    }

}

//body
var quizbody = document.createElement('div');
quizbody.setAttribute("id", "quizBody")
document.querySelector("#quiz").append(quizbody);
var h1 = document.createElement('h1');
h1.textContent = "Coding Quiz Challenge"
quizbody.append(h1);
var p = document.createElement('p');
p.textContent = "Try to answer the following code-related questions within the time limit. ";
quizbody.append(p);

//start the quiz
var startBtn = document.createElement("Button");
startBtn.textContent = "Start Quiz";
quizbody.append(startBtn);

startBtn.addEventListener("click", function () {
    start();
});

//view highscores link on the top left of nav bar-->

var navLeft = document.createElement('div');
navLeft.setAttribute("class", "left")
document.querySelector("#nav").append(navLeft);
var a = document.createElement('a');
a.setAttribute("href", "#")
a.addEventListener("click", function () {
    document.getElementById("quizBody").innerHTML = " ";

getScore();});

navLeft.append(a);
var h4 = document.createElement('h4');
h4.textContent = "High Scores";
a.append(h4);

//countdown timer on the top right of nav bar-->
var navRight = document.createElement('div');
navRight.setAttribute("class", "right")
document.querySelector("#nav").append(navRight);
var h42 = document.createElement('h42');
h42.textContent = "Timer :";
navRight.append(h42);
var span = document.createElement('span');
span.setAttribute("id", "timeLeft")
span.textContent="0";
h42.append(span)

