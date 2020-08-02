// Initialize variables 
let activePlayer, totalScores, roundScore, playing, previousRoll,maxScore;

const dice = document.querySelector('#dice');

// Set variable and elements to 0 
startGame();

document.querySelector('.btn-new').addEventListener('click',startGame);

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (playing) {

        // Random number between 1 and 6 and update number on screen for active player
        let diceNumber = Math.ceil(Math.random() * 6);

        // Show dice with same number
        dice.style.display = 'block';
        dice.src = `dice-${diceNumber}.png`;

        if (diceNumber === 6 && previousRoll === 6) {

            // Loses entire score
            totalScores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = totalScores[activePlayer];
            finishTurn();

        } else if (diceNumber !== 1) {

            // Add dice number to score and save prev roll
            roundScore += diceNumber;
            previousRoll = diceNumber;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

        } else {
            finishTurn();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (playing) {

        // Update global score
        totalScores[activePlayer] += roundScore;
        document.querySelector(`#score-${activePlayer}`).textContent = totalScores[activePlayer];

        if (totalScores[activePlayer] >= maxScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER';
            const playerPanel = document.querySelector(`.player-${activePlayer}-panel`);
            playerPanel.classList.add('winner');
            playerPanel.classList.remove('active');
            dice.style.display = 'none';
            playing = false;

        } else {
            finishTurn()
        }
    }
});

function finishTurn() {
    // Update scores
    roundScore = 0;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore.toString();
    previousRoll = 0;

    // Change turns
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    dice.style.display = 'none';
}

function startGame() {
    activePlayer = 0;
    playing = true;
    maxScore = 100;

    // index 0 is first player, index 1 is second player
    totalScores = [0, 0];
    roundScore = 0;
    previousRoll = 0;

    // Hide dice at the start of the game
    dice.style.display = 'none';

    // Reset all score elements
    document.querySelectorAll('.reset').forEach(element => {
        // @ts-ignore
        element.textContent = 0;
    });

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    const player0Panel = document.querySelector('.player-0-panel'); 
    player0Panel.classList.remove('active'); // Make sure there is no active class
    player0Panel.classList.add('active');
    player0Panel.classList.remove('winner');

    const player1Panel = document.querySelector('.player-1-panel');
    player1Panel.classList.remove('active');
    player1Panel.classList.remove('winner');
}