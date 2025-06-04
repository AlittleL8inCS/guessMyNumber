'use strict';

let secretNumber = Math.trunc(Math.random() * 19 + 1);

const message = document.querySelector(`.message`);
message.textContent = `Start meme...`;

const labelHighscore = document.querySelector(`.label-highscore`);
labelHighscore.textContent = ` 🥇 Highscore: 20`; // Initial highscore
let number = document.querySelector(`.number`);
number.textContent = '?'; // Initially set to the secret number for visibility
const score = document.querySelector(`.score`);
let scoreVal = 20; // Initial score

let guess = document.querySelector(`.guess`);

const checkButton = document.querySelector(`.check`);

//make the box blink
function makeBoxBlink(hexcode) {
  number.style.backgroundColor = hexcode;
  setTimeout(() => {
    number.style.backgroundColor = `#fff`;
  }, 100);
}

checkButton.addEventListener(`click`, () => {
  let currGuess = Number(guess.value);

  if (!currGuess) {
    message.textContent = `No number! 🤷‍♂️`;
  } else if (currGuess === secretNumber) {
    message.textContent = `Correct Number! 🎉 \nNumber Changed`;

    //Make the number visible for 3 seconds
    number.textContent = secretNumber;
    number.style.backgroundColor = `#60b347`;
    checkButton.disabled = true; // Disable the button after correct guess

    setTimeout(() => {
      number.textContent = '?';
      number.style.backgroundColor = `#fff`;
      checkButton.disabled = false; // Re-enable the button after 3 seconds
    }, 3000);

    //change score
    scoreVal++;
    score.textContent = scoreVal;

    // Change secret number
    secretNumber = Math.trunc(Math.random() * 19 + 1);

    // Update the highscore if the current score is greater
    if (scoreVal > Number(labelHighscore.textContent.split(': ')[1])) {
      labelHighscore.textContent = ` 🥇 Highscore: ${scoreVal}`;
    }
  } else if (currGuess > secretNumber) {
    message.textContent = `Too high! 📈`;
    makeBoxBlink(`#ff0000`);
    scoreVal--;
    score.textContent = scoreVal;
  } else if (currGuess < secretNumber) {
    makeBoxBlink(`#ff0000`);
    message.textContent = `Too low! 📉`;
    scoreVal--;
    score.textContent = scoreVal;
  }
});
