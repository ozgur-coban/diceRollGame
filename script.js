'use strict';
// selecting by id
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let totalScores = [0, 0];
let gameOver = false;

const init = function () {
  document.querySelector('.start-text').classList.remove('hidden');
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  gameOver = false;
};

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
};

btnRoll.addEventListener('click', function () {
  document.querySelector('.start-text').classList.add('hidden');
  if (!gameOver) {
    // generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // display that random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    // check if the number is === 1
    if (diceNumber !== 1) {
      
      currentScore += diceNumber;
      // Later : change  for each player
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch to next player
    else {
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (!gameOver) {
    // add current score to active player's score
    totalScores[activePlayer] += currentScore;
    currentScore = 0;
    
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // check if score > 100 , if yes , finish the game
    if (totalScores[activePlayer] >= 100) {
      gameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
