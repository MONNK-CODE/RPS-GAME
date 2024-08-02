document.addEventListener('DOMContentLoaded', function() {
    let computermaterials = ["rock", "scissors", "paper"];
    let rock = document.querySelector(".rock");
    let paper = document.querySelector(".paper");
    let scissors = document.querySelector(".scissors");
    let result = document.querySelector(".result");
    let restart = document.querySelector(".restart");
    let restartscore = document.querySelector(".restartscore");
    let playerScore = 0;
    let computerScore = 0;
    let playerScoreSpan = document.getElementById('playerScore');
    let computerScoreSpan = document.getElementById('computerScore');

     let gamePlayed = false; // this flags to check if the game has been played

    function disableButtons(disable) {
        rock.disabled = disable;
        paper.disabled = disable;
        scissors.disabled = disable;
    }

    restart.addEventListener('click', function() {
        if (gamePlayed) {
        if (playerScore > 0 || computerScore > 0)
        result.innerHTML = "You may now play again."; 
        disableButtons(false); // This enables the buttons again
        } else{
        result.innerHTML = "Please play a round first.";
        }
    });

    restartscore.addEventListener('click', function() {
        if (gamePlayed) { // this only reset scores if the game has been played
            playerScore = 0; // this resets the player score
            computerScore = 0; // this resets the computer score
            playerScoreSpan.textContent = playerScore; // this updates the display for player score
            computerScoreSpan.textContent = computerScore; // this updates the display for computer score
            result.innerHTML = "The score is reset."; 
            disableButtons(false);
            updateScoreDisplay();
        } else {
            result.innerHTML = "Please play a round first2.";
        }
    });


    rock.addEventListener('click', function() { playerChoice("rock"); });
    paper.addEventListener('click', function() { playerChoice("paper"); });
    scissors.addEventListener('click', function() { playerChoice("scissors"); });

    function updateScoreDisplay() {
        let playerLabel = document.querySelector('.score-entry:nth-child(1) .label');
        let computerLabel = document.querySelector('.score-entry:nth-child(2) .label');

        
    if (playerScore > computerScore) {
        playerLabel.innerHTML = '<i class="fa-solid fa-trophy"></i> Player Score: ';
        playerLabel.style.color = 'blue';
        computerLabel.style.color = 'black'; // this resets the computer label color
    }
    else if (computerScore > playerScore) {
        computerLabel.innerHTML = '<i class="fa-solid fa-trophy"></i> Computer Score: ';
        computerLabel.style.color = 'blue';
        playerLabel.style.color = 'black'; // this resets the player label color
    } 
    else {
         // this resets the labels to remove any existing icons
        playerLabel.innerHTML = 'Player Score: ';
        computerLabel.innerHTML = 'Computer Score: ';
        playerLabel.style.color = 'black'; 
        computerLabel.style.color = 'black';
    }
    }

    function playerChoice(player) {
        result.innerHTML = "Computer picking...";
        let computerChoice = computermaterials[Math.floor(Math.random() * computermaterials.length)];

        setTimeout(function() { // this delays the computer's choice to simulate picking
            let resultText = check(player, computerChoice);
            result.innerHTML = `Player chose: ${player}. Computer chose: ${computerChoice}. ${resultText}`; 
            disableButtons(true); // this disables the game buttons after a choice is made
            updateScoreDisplay();
            playerScoreSpan.textContent = playerScore;
            computerScoreSpan.textContent = computerScore;
            gamePlayed = true;
        }, 2000); // this delays it by 2 seconds its in milliseconds
    }

    function check(player, computerChoice) {
        if (player === computerChoice) {
            return '<h3 class="winner">It\'s a draw! Smart minds think alike.</h3>';
        } else if (
            (player === "rock" && computerChoice === "scissors") ||
            (player === "paper" && computerChoice === "rock") ||
            (player === "scissors" && computerChoice === "paper")
        ) {
            playerScore++;
            return '<h3 class="winner">Player wins!</h3>';
        } else {
            computerScore++;
            return '<h3 class="winner">Computer wins!</h3>';
        }
    }
});
