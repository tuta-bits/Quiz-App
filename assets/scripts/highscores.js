const highScoresList = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// PARSING HIGHSCORES FROM LOCAL STORAGE TO DISPLAY WITHIN <LI>
//.map takes the set of arrays in highscores and convert it to whatver you're after
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score"><i class="material-icons">person</i> ${score.name} : ${score.score}</li>`
}).join('');