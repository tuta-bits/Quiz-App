'use strict';
/* Getting References */

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('option-text'));

/* Setting variables */

let currentQuestion = {};
let obtainingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

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