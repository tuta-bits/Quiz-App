const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// PARSING HIGHSCORES TO STRING
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

// EVENT LISTENER FOR SAVE BUTTON
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


// SAVE HIGHSCORE FUNCTION
saveHighScore = e => {
    e.preventDefault();

    const score = {
        //score: Math.floor(Math.random() * 100),
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score); // SORTING HIGHSCORE IN DESCENDING ORDER
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');

};

