const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount; 
const maxGuesses = 6;
let guessedWord = "";


const resetGame = () => {
  //representing all game variables with ui elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `image/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach((button) => (button.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
    gameModal.classList.remove("show");
};


const getRandomWord = () => {
  //select a random word from the wordList array
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

  //set the currentWord to the selected word
  currentWord = word;
  wrongGuessCount = 0;
  guessedWord = "_".repeat(word.length);
  //display the word and hint in the console

  console.log(word + " " + hint);
  //set the hint text to the hint of the selected word
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
  
  //create a span element for each letter of the word
};


const gameOver = (isVictory) => { 
  // after 300ms, show the game modal with the result
  setTimeout(() => {
    const modalText = isVictory ? `You found the word!` : `the correct word was: `;
    
    gameModal.querySelector("img").src =`image/${isVictory ? "victory" : "lost"}.gif`;
    gameModal.querySelector("h4").innerText =`${isVictory ? "congrats!" : "Game Over"}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;

    gameModal.classList.add("show");
  }, 300);
}


const initGame = (button, clickedLetter) => {
  console.log(button, clickedLetter);

  // check if the clicked letter is in the current word  
  if (currentWord.includes(clickedLetter)) {
    console.log(clickedLetter + " is in the word");
    // show the letter in the wordDisplay
   [...currentWord].forEach((letter, index) => { 
    
      if(letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
   });
   
  } else {
    // if the clicked letter is not in the word, increase the wrongGuessCount and change the hangman image
    wrongGuessCount++;
    hangmanImage.src = `image/hangman-${wrongGuessCount}.svg`;
    console.log(clickedLetter + " is not in the word");
  }
  button.disabled = true; // disable the clicked button
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // calling the gameOver function to check if the game is over
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};



//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);

  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord)
