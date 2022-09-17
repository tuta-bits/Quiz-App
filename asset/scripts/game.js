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
let questions = [];

// CREATING A PROMISE THAT WILL RETURN QUESTIONS FROM PUBLIC API
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(res => {

    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions);

    // RETRIVING QUESTIONS FROM THE PUBLIC API BE DISPLAYED
    questions = loadedQuestions.results.map(loadedQuestion => {
        const apiQuestion = {
            question: loadedQuestion.question
        };

        // SPREAD AND RANDOMISE THE CORRECT AND INCORRECT ANSWERS
        const answerOptions = [... loadedQuestion.incorrect_answers];
        apiQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerOptions.splice(apiQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerOptions.forEach((option, index) => {
            apiQuestion['option' + (index+1)] = option;
        })

        return apiQuestion;

    });

    startGame();
}).catch(err => {
    console.error(err);
});


// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

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

    // SAVING SCORE TO LOCAL STORAGE
    localStorage.setItem('mostRecentScore', score);
    
    //GO TO END PAGE
    return window.location.assign('/finale.html');
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

