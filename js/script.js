const getComputerChoice = () => {
  const choice = ['rock', 'paper', 'scissors'];
  return choice[Math.floor(Math.random() * 3)];
}

const getHumanChoice = () => {
  const choice = prompt('Rock, Paper, Scissors?').toLowerCase();

  if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
    return choice;
  }
  else {
    alert('Invalid Choice');
    return getHumanChoice();
  }
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  console.log(`Player Chooses ${humanChoice}`);
  console.log(`Computer Chooses ${computerChoice}`);
  if (humanChoice === computerChoice) {
    console.log("it's a tie");
    humanScore++;
    computerScore++;
  } else if (
    (humanChoice === 'rock' && computerChoice === 'paper') ||
    (humanChoice === 'paper' && computerChoice === 'scissors') ||
    (humanChoice === 'scissors' && computerChoice === 'rock')
  ) {
    console.log('Computer Wins');
    computerScore++;
  } else {
    console.log('Player Wins');
    humanScore++;
  }
}

function playGame(rounds) {
  let i = 0;
  while (i < rounds) {
    playRound(getHumanChoice(), getComputerChoice());
    i++;
  }

  if (humanScore === computerScore) {
    console.log(`Shit it's a tie`);
    tieBreaker();
  } else if (humanScore > computerScore) {
    console.log('Human Wins This Game, Computer Such a Losers');
  } else {
    console.log('Computer Wins This Game, Player Such a Losers');
  }
}

const tieBreaker = () => {
  const moreRounds = prompt('More Rounds?').toLowerCase();
  if(moreRounds === 'yes' || moreRounds == 'y') {
    return playGame(1);
  } else {
    const afraid = prompt('What a shame, are you afraid to a mere Computer?'.toLowerCase());
    if(afraid === 'no' || afraid == 'n') {
      return tieBreaker();
    } else {
      return alert('Lmao This Nigga Such A Loser');
    }
  }
}

playGame(5);