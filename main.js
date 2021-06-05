// list of questions 
var questions = [
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

var timerEl = document.getElementById('countdown');

var startBtn = document.getElementById('start');

//Time to count down from 75
function countdown() {
    var timeLeft = 75;

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



startBtn.onclick = countdown;