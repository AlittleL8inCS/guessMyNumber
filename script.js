'use strict';

const message = document.querySelector(`.message`);
const labelHighscore = document.querySelector(`.label-highscore`);
let number = document.querySelector(`.number`);
const score = document.querySelector(`.score`);
let scoreVal = 20;
let highscoreEl = document.querySelector(`.highscore`);
let againBtn = document.querySelector(`.again`);
let guess = document.querySelector(`.guess`);
const checkButton = document.querySelector(`.check`);

let highscore = 0; // Initialize highscore
let secretNumber;

function displayMessage(msg) {
  message.textContent = msg;
}

function resetState() {
  secretNumber = Math.trunc(Math.random() * 19 + 1);
  displayMessage(`Start guessing...`);
  number.textContent = '?'; // Initially set to the secret number for visibility
  number.style.width = `15rem`;
  number.style.backgroundColor = `#fff`;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  scoreVal = 20;
  score.textContent = scoreVal;
  guess.value = ``;
  highscoreEl.textContent = `${highscore}`;
  checkButton.disabled = false;
  againBtn.classList.add(`hidden`);
}

//make the box blink
function makeBoxBlink(hexcode) {
  number.style.backgroundColor = hexcode;
  setTimeout(() => {
    number.style.backgroundColor = `#fff`;
  }, 100);
}

function wrongGuess(direction) {
  displayMessage(
    `too ${direction}! ${
      direction == 'high' ? '📈' : direction == 'low' ? '📉' : ''
    }`
  );
  makeBoxBlink(`#ff0000`);
  scoreVal--;
  setTextContent(score, scoreVal);
}

checkButton.addEventListener(`click`, () => {
  let currGuess = Number(guess.value);

  if (!currGuess) {
    displayMessage(`⛔ No number!`);
  } else if (currGuess === secretNumber) {
    displayMessage(`🎉 Correct Number!`);

    number.textContent = secretNumber;
    document.querySelector(`body`).style.backgroundColor = `#60b347`;
    number.style.width = `30rem`;
    checkButton.disabled = true; // Disable the button after correct guess

    // START AFTER 3 SECONDS
    // setTimeout(() => {
    //   number.textContent = '?';
    //   number.style.backgroundColor = `#fff`;
    //   checkButton.disabled = false; // Re-enable the button after 3 seconds
    //   document.querySelector(`body`).style.backgroundColor = `#222`;
    //   number.style.width = `15rem`;
    // }, 3000);

    //change score
    scoreVal++;
    score.textContent = scoreVal;

    if (scoreVal > highscore) {
      highscore = scoreVal;
      highscoreEl.textContent = `${highscore}`;
    }

    againBtn.classList.remove(`hidden`); // Show the "Again" button

    // Change secret number
    // secretNumber = Math.trunc(Math.random() * 19 + 1);
  } else if (currGuess > secretNumber && scoreVal > 0) {
    wrongGuess('high');
  } else if (currGuess < secretNumber && scoreVal > 0) {
    wrongGuess('low');
  }
  if (scoreVal == 0) {
    displayMessage(`💥 You lost the game!`);
    score.textContent = `0`;
  }
});

againBtn.addEventListener(`click`, () => {
  resetState();
});

resetState();
