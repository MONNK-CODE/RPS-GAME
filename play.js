document.addEventListener('DOMContentLoaded', function() {

  const rock = document.querySelector(".rock"); 
  const paper = document.querySelector(".paper"); 
  const scissors = document.querySelector(".scissors");
  const restart = document.querySelector(".restart"); 
  const restartScore = document.querySelector(".restartscore");
  const display = document.querySelector(".display"); 
  const display2 = document.querySelector(".display2"); 
  const playerLabel1 = document.getElementById('playerLabel1'); 
  const playerLabel2 = document.getElementById('playerLabel2');
  const playerScore1Span = document.getElementById('playerScore'); 
  const playerScore2Span = document.getElementById('computerScore'); 
  const scoretable = document.querySelector('.score-table');
  
  // this initializes the player choices and scores
  let playerInputs = []; // this array to stores the player choices
  let playerScore1 = 0; // Player 1's score
  let playerScore2 = 0; // Player 2's score

  let roundOver = false; // this flag checks if the round is over

  rock.addEventListener('click', function() { playerChoice("rock"); }); 
  paper.addEventListener('click', function() { playerChoice("paper"); }); 
  scissors.addEventListener('click', function() { playerChoice("scissors"); }); 

  // this functions handles player choices
  function playerChoice(choice) {
    // this prevents choosing if the round is over
    if (roundOver) {
      display2.innerHTML = "<span style = 'color: white;'>PRESS NEW ROUND TO CONTINUE</span>";
      return; // this exits the function if the round is over
    }

    // this only allows a maximum of two choices per round
    if (playerInputs.length < 2) {
      playerInputs.push(choice); // this adds the current choice to the array

      if (playerInputs.length === 1) {
        display.innerHTML = "PLAYER 2 GO"; // this tells Player 2 to make a choice
      }
      if (playerInputs.length === 2) {
        // this processes the result after both players have made their choices
        let result = check(playerInputs[0], playerInputs[1]); // this determines the winner
        display.innerHTML = result; // this displays the result
        playerScore1Span.textContent = playerScore1; // this updates Player 1's score
        playerScore2Span.textContent = playerScore2; // this updates Player 2's score

        // this updates scores and disable choices until the next round
        updateScores(); // this updates the score labels with trophy icons
        roundOver = true; // this marks the round is over
        playerInputs = []; // this clears the player choices for the next round
      }
    }
  }

  // this function checks the result of the game
  function check(p1, p2) {
    // this checks if the game is a draw
    if (p1 === p2) {
      return '<h3 class="winner">It\'s a draw! Smart minds think alike.</h3>'; // this returns the draw message
    }

    // this determines if Player 1 and 2 wins
    if ((p1 === "rock" && p2 === "scissors") ||
        (p1 === "paper" && p2 === "rock") ||
        (p1 === "scissors" && p2 === "paper")) {
      playerScore1++; // Increment Player 1's score
      return '<h3 class="winner">PLAYER 1 WINS!</h3>'; // Return Player 1 win message
    } else  {
      playerScore2++; // Increment Player 2's score
      return '<h3 class="winner">PLAYER 2 WINS!</h3>'; // Return Player 2 win message
    }
  }

  // this fucntion updates the score display
  function updateScores() {
    // this adds the trophy icon for the leading player and chnages its color
    if (playerScore1 > playerScore2) {
      playerLabel1.innerHTML = '<i class="fa-solid fa-trophy"></i> Player 1 Score: '; 
      playerLabel1.style.color = 'blue'; 
      playerLabel2.style.color = 'black';
      scoretable.style.backgroundColor = 'white';
    } else if (playerScore2 > playerScore1) {
      playerLabel2.innerHTML = '<i class="fa-solid fa-trophy"></i> Player 2 Score: ';
      playerLabel2.style.color = 'blue';
      playerLabel1.style.color = 'black'; 
    } else {
      // In case of a draw, reset labels without trophies
      playerLabel1.innerHTML = 'Player 1 Score: '; 
      playerLabel1.style.color = 'white'; // draw color
      playerLabel2.innerHTML = 'Player 2 Score: '; 
      playerLabel2.style.color = 'white'; //  draw color
      scoretable.style.backgroundColor = 'black'; // draw color
    }
  }

  restart.addEventListener('click', function() {
    display.innerHTML = "PLAYER 1 GO"; // this resets the main display for Player 1
    display2.innerHTML = ""; // this clears additional display
    playerInputs = []; // this clears player choices for a new round
    roundOver = false; // this sets the round flag to false to allow new choices
  });

//this resets the game
  restartScore.addEventListener('click', function() {
    playerScore1 = 0; // this resets Player 1's score to 0
    playerScore2 = 0; // this resets Player 2's score to 0
    playerScore1Span.textContent = playerScore1; 
    playerScore2Span.textContent = playerScore2; 
    playerLabel1.innerHTML = 'Player 1 Score: ';
    playerLabel2.innerHTML = 'Player 2 Score: '; 
    playerLabel1.style.color = 'black'; 
    playerLabel2.style.color = 'black'; 
    scoretable.style.backgroundColor = 'white';
    restart.click(); // Trigger the restart function to reset the game
  });

});
