// Round section
const start = document.getElementById('start-game');
const startScreen = document.querySelector('.start');
const gameRound = document.getElementById('game-round');
const mainGame = document.getElementById('main-game');
let rounds = 1;
let resetDelay = 4000;

const startRoundAnimations = (rounds) => {
  resetDelay = 4000;
  const roundText = document.querySelectorAll('.round');
  roundText.forEach(text => {
    text.textContent = rounds;
  });

  gameRound.classList.remove('hidden');
  gameRound.classList.add('show');

  setTimeout(() => {
    mainGame.classList.add('show');
  }, 2000);
};

const resetRoundAnimations = () => {
  gameRound.classList.remove('show');
  setTimeout(() => {
    mainGame.classList.remove('show');
    resetRps();
    startRoundAnimations(rounds);
  }, resetDelay);
};

const nextRound = () => {
  rounds++;
  resetRoundAnimations();
};

// Reset Rock Paper Scissors Animation
const resetRps = () => {
  rpsBorders.forEach(border => border.classList.remove('remove'));

  rockPaperScissors.forEach((element, index) => {
    document.documentElement.style.setProperty('--circle-rotation', `${rpsOriginRotation[index]}deg`);
    element.classList.remove('remove', 'choose');
    element.style.pointerEvents = 'auto';
  });

  rockPaperScissorsComputer.forEach((element, index) => {
    element.classList.remove('remove', 'choose');
    element.querySelector('h2').classList.remove('show');
  });

  outcome.parentElement.parentElement.classList.remove('calculate');
}

// Restart Game
const restartGame = (restart) => {
  if(restart) {
    rounds = 0;
    humanScoreCount = 0;
    computerScoreCount = 0;
    playerScore.textContent = humanScoreCount;
    computerScore.textContent = computerScoreCount;
  }
  resetDelay = 0;
  nextRound();
  end.classList.remove('show');
}

// Start Game
start.addEventListener('click', () => {
  startScreen.classList.add('trigger');
  startRoundAnimations(rounds);
});

// Info //
// Info Content
const infoContent = [
  {
    title: 'How to Play',
    img: '../img/rps.png',
    p: "Welcome to Rock Paper Scissors! On the left side of the screen, you'll find the Player Section. Choose your move by clicking on Rock, Paper, or Scissors. Your selected move will then move to the center. On the right side, the computer will randomly select its move, which will also appear in the center. Enjoy the game and see if you can outsmart the computer!"
  },
  {
    title: 'Rules',
    img: '../img/rules.png',
    p: 'The rules of Rock Paper Scissors are simple: Rock crushes Scissors, Scissors cut Paper, and Paper covers Rock. If the final scores between the player and the computer are tied, an extra round will be played to determine the winner. The first player to win 5 rounds (including any tiebreaker rounds) wins the game. Keep playing rounds to see who emerges victorious!'
  },
  {
    title: 'About',
    img: '../img/profile.jpg',
    p: "Hi, I'm Dogeheck. I'm working on a game called Odin Rock Paper Scissors. It's a take on the classic Rock Paper Scissors game. You can visit my GitHub to check it out and share any suggestions you have for improving the project."
  }
];

const infoArrow = document.querySelectorAll('.info-arrow');
const infoPages = document.getElementById('info-page');const infoButton = document.getElementById('info-button');
const info = document.querySelector('.info');
const infoCloseButton = document.getElementById('info-close');
let page = 1;
const totalPages = infoContent.length;
const infoSocial = document.querySelector('.info-social');

function changeInfoContent(page) {
  info.querySelector('.info-title h2').textContent = infoContent[page-1].title;
  info.querySelector('.info-img img').src = infoContent[page-1].img;
  info.querySelector('.info-text p').textContent = infoContent[page-1].p;
  infoPages.textContent = `Page ${page} of ${totalPages}`;
  infoArrow[0].classList.toggle('show', page > 1);
  infoArrow[1].classList.toggle('show', page < totalPages);
  infoSocial.style.display = page === totalPages ? 'flex' : 'none';
};

infoArrow.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if(index === 0) {
      page--;
    } else {
      page++;
    }

    changeInfoContent(page);
  });
});

// Show Info
infoButton.addEventListener('click', () => {
  changeInfoContent(page);
  info.classList.add('show');
});

infoCloseButton.addEventListener('click', () => {
  info.classList.remove('show');
});

// Game Mechanics //
// Player Choose
const rpsOriginRotation = [0, 120, 240];
const rpsComputerRotation = [-90, 270, 270];

const rockPaperScissors = document.querySelectorAll('.player-section .circle');
const rockPaperScissorsComputer = document.querySelectorAll('.computer-section .circle');
const rpsBorders = document.querySelectorAll('.rock-paper-scissors');

let playerChoose;

rockPaperScissors.forEach((rps, index) => {
  rps.addEventListener('click', (e) => {
    playerChoose = rps.querySelector('h2').textContent;
    document.documentElement.style.setProperty('--circle-rotation-origin', `${rpsOriginRotation[index]}deg`);
    document.documentElement.style.setProperty('--circle-rotation', '90deg');

    manageChoices(index, rockPaperScissors);
    rps.style.pointerEvents = 'none';
  
    playGame(rounds);
  })
});

const getHumanChoice = (playerChoose) => {
  playerChoose = playerChoose.toLowerCase();

  if (playerChoose === 'rock' || playerChoose === 'paper' || playerChoose === 'scissors') {
    return playerChoose;
  }
};

// Computer Choose
const getComputerChoice = () => {
  const choice = ['paper', 'scissors', 'rock'];
  let computerRandom = Math.floor(Math.random() * 3);

  document.documentElement.style.setProperty('--circle-rotation-origin-computer', `${rpsOriginRotation[computerRandom]}deg`);
  document.documentElement.style.setProperty('--circle-rotation-computer', `${rpsComputerRotation[computerRandom]}deg`);

  rockPaperScissorsComputer[computerRandom].querySelector('h2').classList.add('show');
  
  manageChoices(computerRandom, rockPaperScissorsComputer);

  return choice[computerRandom];
};

const manageChoices = (index, rockPaperScissors) => {
  rpsBorders.forEach(border => border.classList.add('remove'));
  rockPaperScissors[index].classList.add('choose');

  rockPaperScissors.forEach((element, idx) => {
    if (idx !== index) {
      element.classList.add('remove');
    }
  });
};

// Game Logic
let humanScoreCount = 0;
let computerScoreCount = 0;

const outcome = document.getElementById('result-text');
const playerScore = document.getElementById('player-scores');
const computerScore = document.getElementById('computer-scores');

let resultText = '';

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    resultText = "It's a Tie";
    humanScoreCount++;
    computerScoreCount++;
  } else if (
    (humanChoice === 'rock' && computerChoice === 'paper') ||
    (humanChoice === 'paper' && computerChoice === 'scissors') ||
    (humanChoice === 'scissors' && computerChoice === 'rock')
  ) {
    resultText = 'Computer Win';
    computerScoreCount++;
  } else {
    resultText = 'Player Win';
    humanScoreCount++;
  }

  outcome.textContent = resultText;
  playerScore.textContent = humanScoreCount;
  computerScore.textContent = computerScoreCount;

  outcome.parentElement.parentElement.classList.add('calculate');
}

let restart = false;
const end = document.querySelector('.end-game');
const endGameButton = document.querySelectorAll('#end-game-button');

function playGame(rounds) {
  playRound(getHumanChoice(playerChoose), getComputerChoice());

  if(rounds < 5){
    nextRound();
  } else {
    setTimeout(() => {
      end.classList.add('show');
    }, 3000);
  }

  const endGame = document.getElementById('end-game-text');
  let endGameText = '';

  if (humanScoreCount === computerScoreCount) {
    endGameText = "Shit it's a tie";
    restart = false;
  } else if (humanScoreCount > computerScoreCount) {
    endGameText = 'Player Wins This Game, Computer Such a Losers';
    restart = true;
  } else {
    endGameText = 'Computer Wins This Game, Player Such a Losers';
    restart = true;
  }

  endGameButton[0].classList.toggle('disabled', !restart)
  endGameButton[1].classList.toggle('disabled', restart)

  endGame.textContent = endGameText;
}

endGameButton.forEach((endButton) => {
  endButton.addEventListener('click', () => {
    restartGame(restart);
  })
})