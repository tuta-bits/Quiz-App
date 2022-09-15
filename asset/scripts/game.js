//'use strict';
/* Getting References */

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('option-text'));
const progressText = document.getElementById('prog-txt');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('prog-bar-full');

/* Setting variables */

let currentQuestion = {};
let obtainingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// ARRAYS OF QUESTIONS
let questions = [
    {
        question: 'Inside which HTML element do we put JavaScript ?',
        option1: '<script>',
        option2: '<JavaScript>',
        option3: '<html>',
        option4: '<figcaption>',
        answer: 1
    },
    {
        question: 'What is the correct syntax for referring to this external script "ttt.js" ?',
        option1: '<script href="ttt.js">',
        option2: '<script name="ttt.js">',
        option3: '<script src="ttt.js">',
        option4: '<script file="ttt.js">',
        answer: 3 
    },
    {
        question: 'How do we write "Hello World" in an alert box ?',
        option1: 'msgBox("Hello world");',
        option2: 'alertBox("Hello world");',
        option3: 'msg("Hello world");',
        option4: 'alert("Hello world");',
        answer: 4
    }
];


// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// START GAME FUNCTION
startGame = () => {
    questionCounter = 0
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// NEW QUESTION FUNCTION
getNewQuestion = () => {
if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    
    //GO TO END PAGE
    return window.location.assign('/end.html');
}

    questionCounter++;

    // UPDATING COUNTER
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    // UPDATE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //ITERATE OVER THE CHOICES  
    choices.forEach(option => {
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    obtainingAnswers = true;
};

// SELECTING CHOICES
choices.forEach(option => {
    option.addEventListener('click', e => {
        if(!obtainingAnswers) return;

        obtainingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];

        // APPLYING COLOR TO SELECTED OPTIONS
        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedOption.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000); 

        
    });
});

// iNCREASE SCORE FUNCTION
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();