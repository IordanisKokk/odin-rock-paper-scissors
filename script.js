let userScore = 0;
let compScore = 0;

function getComputersChoice(){

    let rand = Math.floor(Math.random() * 10) % 3;
    let choice;

    if(rand === 0){
        choice = 'rock';
    }else if(rand === 1){
        choice = 'paper';
    }else{
        choice = 'scissors';
    }

    return choice;

}

function round(playerSelection, computerSelection){

    let roundWinner = null;
    if(playerSelection === computerSelection){
        return "Tie!";
    }else{
        if(playerSelection === "rock"){
            if(computerSelection === "scissors"){
                roundWinner = "player";
            }else{
                roundWinner = "comp";
            }
        }else if(playerSelection === "paper"){
            if(computerSelection === "rock"){
                roundWinner = "player";
            }else{
                roundWinner = "comp";
            }
        }else {
            if(computerSelection === "paper"){
                roundWinner = "player";
            }else{
                roundWinner = "comp";
            }
        }
    }
    if(roundWinner != null){
        if(roundWinner === "player"){
            userScore++;
            return ("You win! " + playerSelection + " beats " + computerSelection +"!");
        }else{
            compScore++;
            return ("You lose! " + computerSelection + " beats " + playerSelection +"!");
        }
    }
}

function game(){

    while(userScore < 5 && compScore < 5){
        let userInput;
        while(userInput != 'rock' && userInput != 'paper' && userInput != 'scissors' ){
            userInput = prompt("Select Rock, Paper or Scissors");
            userInput = userInput.toLowerCase();
        }
        console.log("You have selected " + userInput + "!");
        console.log(round(userInput, getComputersChoice()))
        console.log("SCORE")
        console.log("USER: " + userScore + " COMPUTER: " + compScore);
    }
    
    if(compScore === 5){
        console.log("Computer Wins! Better luck next time...");
    }else if(userScore === 5){
        console.log("You Win! Congratulations! :)");
    }

}


game();