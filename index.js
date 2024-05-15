const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const notInRangeMessage = document.getElementById('not-in-range');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  let guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  let remainingAttempts = maxNumberOfAttempts - attempts;

  // Check if guess is within the range 1 to 100 (out-of-range guesses are still counted)
  if (guess < 1 || guess > 100) {
    notInRangeMessage.style.display = '';
    notInRangeMessage.innerHTML = `You entered ${guess}. Invalid guess. 
        <br> Please enter a number between 1 and 100.
        <br> ${remainingAttempts} guesses remaining`
    hideAllMessages(notInRangeMessage)
    return;
  }
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts === 1 ? '' : 'es'}.`; // singular - plural

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // fixed - display for too high guess
    }

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. 
        <br> ${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining.`; // singular - plural
  }

  if (attempts === maxNumberOfAttempts) { // fixed triple equals
    maxGuessesMessage.style.display = ''; // fixed display maxGuessesMessage
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages(message) {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // fixed to less than
    // hiding all except a certain message
    if (messages[elementIndex] !== message) {
      messages[elementIndex].style.display = 'none';
    }
  }
}

function setup() { // typo in keyword
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // start value of attempts

  // Enable the input and submit button
  submitButton.disabled = false; // typo in disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
