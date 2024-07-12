const rockButton = document.querySelector('.rock-btn');
const paperButton = document.querySelector('.paper-btn');
const scissorsButton = document.querySelector('.scissors-btn');
const result = document.getElementById('result');
const moves = document.getElementById('moves');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset-btn');

// Get score from loacalStorage or keep it 0 if its not there
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

//! if (!score){
//!   score = {
//!     wins: 0,
//!     losses: 0,    because i have the || (or), this isnt needed
//!     ties: 0
//!   }
//! }

// let score = {
//   wins: 0,
//   losses: 0,
//   ties: 0
// }

// Initialize score display
updateScore();

// Added event listeners to the buttons
rockButton.addEventListener('click', () => gamePlay('Rock'));
paperButton.addEventListener('click', () => gamePlay('Paper'));
scissorsButton.addEventListener('click', () => gamePlay('Scissors'));
resetButton.addEventListener('click', resetGame);

// Function to pick computer move using Math.random
function pickComputerMove(){
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3){
    computerMove = 'Rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1){
    computerMove = 'Scissors';
  }

  return computerMove;
}

// Function for the actual game
const gamePlay = (playerMove) => {
  let result = '';

  const computerMove = pickComputerMove();

  if (playerMove === 'Rock'){
    if (computerMove === 'Scissors'){
      result = 'You Win!'
    }
    else if(computerMove === 'Paper'){
      result = 'You Lose!'
    }
    else if(computerMove === 'Rock'){
      result = 'A Tie!'
    }
  }
  else if (playerMove === 'Paper'){
    if (computerMove === 'Rock'){
      result = 'You Win!'
    }
    else if(computerMove === 'Scissors'){
      result = 'You Lose!'
    }
    else if(computerMove === 'Paper'){
      result = 'A Tie!'
    }
  }
  else if (playerMove === 'Scissors'){
    if (computerMove === 'Paper'){
      result = 'You Win!'
    }
    else if(computerMove === 'Rock'){
      result = 'You Lose!'
    }
    else if(computerMove === 'Scissors'){
      result = 'A Tie!'
    }
  } 

  // Update the score based on the result above
  if (result === 'You Win!'){
    score.wins ++;
  }
  else if (result === 'You Lose!'){
    score.losses ++;
  }
  else if (result === 'A Tie!'){
    score.ties ++;
  }

  // The updates and the localStorage
  updateResult(result);
  updateMoves(playerMove, computerMove);
  updateScore();
  updateScoreInLocalStorage(); // Update loaclStorage after every game
}

// Function to update and display results
function updateResult(resultText){
  result.innerHTML = resultText;
}

// Function to update and display player and computer moves
function updateMoves(playerMove, compMove){
  //TODO: change this so it uses images, copy paste the HTML code for it to work
  moves.innerHTML = `You <img src="Images/${playerMove.toLowerCase()}-emoji.png" class="move-img"> | <img src="Images/${compMove.toLowerCase()}-emoji.png"
          class="move-img"> Comp`;
}

// Function to update and display scores
function updateScore(){
  scoreElement.innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`
}

// Function to update score in the localStorage
function updateScoreInLocalStorage(){
  localStorage.setItem('score', JSON.stringify(score));
}

// Function to reset the game
function resetGame (){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }

  // Update score after reset
  updateScore();
  updateScoreInLocalStorage(); // Update localStorage after resetting
}


