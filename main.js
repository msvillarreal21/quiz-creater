// var scoreFin = document.getElementById("scorefinal")
var timerEl = document.getElementById('countdown');
var start = document.getElementById('#start');
var question = document.getElementById('question');
var A = document.getElementById('A');
var B = document.getElementById('B');
var C = document.getElementById('C');
var D = document.getElementById('D');
var scoreEl = document.getElementById('score');
var highScoreBtn = document.getElementById('highScores')
var questionCounter = -1;
var timeLeft = 75;
var bonusTime = 0;
var playerScore = 0
var finalScore = document.getElementById('finalScore');
var highScoreSpan = document.getElementById('highScore');
var submitButton = document.getElementById('#submitInitials');
var questionsCounter = -1;
var finalAnswer;
var score = 0;
var choiceSelected;



// list of questions 
var question = [
    {
    question: 'JS is short for?',
    mulitpleChoice: [
        '<a>',
        '<b>',
        '<c>',
        '<d>'
    ],
    answer: '<a>'   
    }
];
//add event listener for seleting the answers 
document.querySelectorAll('#options-wrapper').forEach(item => {
    item.addEventListener('click' , event => {
        alert('button clicked')
        console.log (event.target);
        answerPicked = document.getElementById(event.target.id).innerText;
        console.log(answerPicked);
        answers();
    })
})

// var for answer "key"
var answers = function() {
    if(rightAnswer === answerPicked) {
        console.log(rightAnswer + "right answer")
        console.log(answerPicked)
        alert("Correct!")
        score++;
        scoreEl.textContent = score;
        console.log(questionCounter) 
    
// This looks to see if it's the last question, if it is then it gives score. 
if (questionCounter === questions.length-1) {
    alert("Game has finished!");
    bonusTime = timeleft;
    console.log(timeLeft);
    score = score + bonusTime;
    playerScore = score;
    finalScore.textContent = "Final Score" + score;
    console.log("Player final score is:" + playerScore);
    saveHighScore();
    timeLeft = 0;
    }
// if not the last question
else {
    questionCounter++
    console.log (questionCounter + "question");

    establishButtons();
    }
}

//If (else) answer selected is wrong
else {
    alert("Wrong answer")
    console.log(finalAnswer + "final answer")
    console.log(choiceSelected)

    if(score === 0) {
        alert("You have lost the game")
        timeLeft = 0;
    }
    else {
        questionCounter ++;
        console.log(questionCounter + "question");
        establishButtons();
    }
}


//Time to count down from 75
function countdown() {
   
// Call function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds';
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second';
        timeLeft--;
    } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        
    }
  }, 1000);
}

// function to establish buttons and add event-listeners to listen for the selectedChoice
var establishButtons = function(){
    question.innerText =question[questionCounter].question;
    buttonA.innerText =question[questionCounter].multipleChoice[0];
    buttonB.innerText =question[questionCounter].multipleChoice[1];
    buttonC.innerText =question[questionCounter].multipleChoice[2];
    buttonD.innerText =question[questionCounter].multipleChoice[3];

    finalAnswer= question[questionCounter].answer
    console.log("final answer = " + finalAnswer);
}

//adds event listener to each of the multiple choice buttons, looks for the button choice.
document.querySelectorAll('#options-wrapper').forEach(item =>{
    item.addEventListener('click',event =>{
        alert('button clicked')
        console.log(event.target);
        selectedChoice = document.getElementById(event.target.id).innerText;
        console.log(selectedChoice);
        solutions();
    })
})

//save highscore and initials
var saveHighScore = function(){ 
    // retrieves highscore if available 
    var highscore = localStorage.getItem("highscore");
    console.log(highscore);

    //if highscore is available, enter loop
    if(highscore !== null){
        if(userScore > highscore){
            alert("You're the new high score!', type your intials and submit"); 
            submitButton.addEventListener('click', function(event){
                var initials = document.getElementById('initials').value;
                localStorage.setItem("highscore", playerScore);
                localStorage.setItem('initials',initials);
            });
        }
        else {
            alert("Please try again!");  
        }
     
    }   //save new highscore to local storage
    else {
        alert("You're the new high score!', type your intials and submit");
        submitButton.addEventListener('click', function(event){
            var initials = document.getElementById('initials').value;
            localStorage.setItem("highscore",playerScore);
            localStorage.setItem('initials',initials);
        });
    }

}

//add event listener to be able to see the highest score.
highScoreBtn.addEvenListener('click', function(event) {
    event.preventDefault();

    returnHighScore();

})

start.addEventListener("click",function(){
    countdown();
    alert("Game has begun!");
    document.getElementById("welcome").style.display = "none";
    document.getElementById("start").style.display = "none";    
    questionCounter ++;
    show();
    establishButtons();
});

//to make the questions hide. 
function show() {
    if (document.getElementById('options-wrapper').style.display="block") {
        document.getElementById('options-wrapper').style.display="none"
    } else {
        document.getElementById("options-wrapper").style.display="block";
    }
  
}
// gets highsscore from local storage
var getHighScore = function() {
    highScore = localStorage.getItem('highscore');
    console.log(highscore);
    var initials = localStorage.getItem('initials');
    console.log(initials);
    highScoreSpan.textContent = highscore;
    initialsSpan.textContent = initials;
}
//shows highscore when highscore button is pressed. 
var returnHighScore = function(){
    var highscore = document.getElementById('card');
    if (highscore.style.display == 'none') {
        highscore.style.display = 'block';
    } else {
        highscore.style.display = 'none';
    }
}
}

