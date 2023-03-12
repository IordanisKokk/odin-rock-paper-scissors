const gameContainer = document.querySelector('.gamecontainer');

const btnImages = ['resources/rock.svg', 'resources/paper.svg', 'resources/scissors.svg']

const rockButton = new Image(100, 100);
const paperButton = new Image(100, 100);
const scissorsButton = new Image(100, 100);

const buttons = [rockButton, paperButton, scissorsButton]

const startButton = document.querySelector('.startButton');
const header1 = document.querySelector('#header1');
const header2 = document.querySelector('#header2');
const winnerHeader = document.createElement('h3');

const headerContainer = document.querySelector('.header-container');
const battleContainer = document.querySelector('.battleContainer');
const roundContainer = document.querySelector('.roundContainer');

const roundResults = document.querySelector('.results');
const roundHeader = document.querySelector('.round');



let roundNumber = 0;

let userScore = 0;
let compScore = 0;

let finished = false;

let playersChoice;

function getComputersChoice() {

    let rand = Math.floor(Math.random() * 10) % 3;
    let choice;

    if (rand === 0) {
        choice = 'rock';
    } else if (rand === 1) {
        choice = 'paper';
    } else {
        choice = 'scissors';
    }

    return choice;

}

function round(playerSelection, computerSelection) {
    roundNumber++;
    let roundWinner = null;
    let result;

    if (playerSelection === computerSelection) {
        result = "Tie!";
    } else {
        if (playerSelection === "rock") {
            if (computerSelection === "scissors") {
                roundWinner = "player";
            } else {
                roundWinner = "comp";
            }
        } else if (playerSelection === "paper") {
            if (computerSelection === "rock") {
                roundWinner = "player";
            } else {
                roundWinner = "comp";
            }
        } else {
            if (computerSelection === "paper") {
                roundWinner = "player";
            } else {
                roundWinner = "comp";
            }
        }
    }
    if (roundWinner != null) {
        if (roundWinner === "player") {
            userScore++;
            result = ("You win! " + playerSelection + " beats " + computerSelection + "!");
        } else {
            compScore++;
            result = ("You lose! " + computerSelection + " beats " + playerSelection + "!");
        }
    }
    return result;
}

function checkIfGameIsFinished() {
    if (userScore >= 5 || compScore >= 5) {
        gameContainer.remove(rockButton);
        gameContainer.remove(paperButton);
        gameContainer.remove(scissorsButton);
        roundContainer.replaceChildren();
        winnerHeader.classList.add('winnerHeader');
        if (userScore === 5) {
            winnerHeader.textContent = 'YOU WIN!!!';
        } else {
            winnerHeader.textContent = 'YOU LOSE!!! Try again';
        }
        headerContainer.replaceChildren(winnerHeader)
        headerContainer.append(header2);

        headerContainer.append(startButton)
        userScore = 0;
        compScore = 0;
        roundNumber = 0;
    }

}

function updateScoreBoard() {
    header2.textContent = `SCORE: ${userScore} - ${compScore} `
}

function getPlayersChoiceAndPlayRound(e) {
    playersChoice = (this.id);
    let computersChoice = getComputersChoice();
    console.log('Player: ' + playersChoice);
    console.log('Computer: ' + computersChoice);

    result = round(playersChoice, computersChoice);
    console.log(result);
    renderRound(playersChoice, computersChoice, result);
    updateScoreBoard();
    checkIfGameIsFinished();
}

function renderRound(playerChoice, computerChoice, result) {
    let content = document.querySelector('.content');
    const playerImageWrapper = document.createElement('div');
    playerImageWrapper.classList.add('imagewrapper');
    playerImageWrapper.id = 'player';

    const compImageWrapper = document.createElement('div');
    compImageWrapper.classList.add('imagewrapper');
    compImageWrapper.id = 'comp';

    const playerChoiceImage = new Image(100, 100);
    playerChoiceImage.src = `resources/${playerChoice}.svg`;
    const playerHeader = document.createElement('h3');
    playerHeader.textContent = 'YOU';
    const playerChoiceLabel = document.createElement('p');
    playerChoiceLabel.textContent = playerChoice.toUpperCase();
    playerImageWrapper.appendChild(playerHeader);
    playerImageWrapper.appendChild(playerChoiceImage);
    playerImageWrapper.appendChild(playerChoiceLabel);

    const compChoiceImage = new Image(100, 100);
    compChoiceImage.src = `resources/${computerChoice}.svg`;
    const compHeader = document.createElement('h3');
    compHeader.textContent = 'COMP';
    const compChoiceLabel = document.createElement('p');
    compChoiceLabel.textContent = computerChoice.toUpperCase();
    compImageWrapper.appendChild(compHeader);
    compImageWrapper.appendChild(compChoiceImage);
    compImageWrapper.appendChild(compChoiceLabel);

    console.log(playerImageWrapper);
    console.log(battleContainer);
    console.log("HAS CHILD NODES: " + battleContainer.hasChildNodes())

    if (battleContainer.firstElementChild === null) {
        battleContainer.appendChild(playerImageWrapper);
        battleContainer.appendChild(compImageWrapper);
        console.log(battleContainer.firstElementChild);
    } else {
        battleContainer.replaceChildren(playerImageWrapper, compImageWrapper);
    }

    roundContainer.appendChild(roundHeader);
    roundContainer.appendChild(battleContainer);
    roundContainer.appendChild(roundResults);

    roundResults.textContent = result;

    roundHeader.textContent = `ROUND ${roundNumber}`



}

function renderButtons() {

    console.log("rendering Buttons...");

    rockButton.id = 'rock';
    paperButton.id = 'paper';
    scissorsButton.id = 'scissors';

    if (roundNumber === 0) {
        let i = 0;
        buttons.forEach(button => {
            button.src = btnImages[i];
            button.classList.add('playButton')
            gameContainer.appendChild(button);
            i++
        });

        buttons.forEach(button => {
            button.addEventListener('click', getPlayersChoiceAndPlayRound)
        });
    }
    else {
        buttons.forEach(button => {
            gameContainer.appendChild(button);
        });
    }


}

startButton.addEventListener("click", () => {
    console.log('button clicked')
    header1.textContent = 'PLAYING ROCK, PAPER, SCISSORS!!!';

    if (headerContainer.firstElementChild === winnerHeader) {
        headerContainer.replaceChild(header1, winnerHeader);
        let content = document.querySelector('.content');
        content.appendChild(roundContainer);
        content.appendChild(gameContainer);
    }

    header2.textContent = 'SCORE: 0 - 0';
    startButton.remove();
    renderButtons();
});

