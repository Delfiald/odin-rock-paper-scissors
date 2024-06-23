// playGame(5);
// Interactive Section //
const start = document.getElementById('start-game');
const startScreen = document.querySelector('.start');
const gameRound = document.getElementById('game-round');
const mainGame = document.getElementById('main-game');

// Round section
let rounds = 1;

const startRoundAnimations = (rounds) => {
  const roundText = document.querySelectorAll('.round');
  roundText.forEach(text => {
    text.textContent = rounds;
  });
  gameRound.classList.remove('hidden');
  gameRound.classList.add('show');
  setTimeout(() => {
    mainGame.classList.add('show');
  }, 2000);

  // gameRound.classList.add('show');
  // setTimeout(() => {
  //   gameRound.classList.add('hidden');
  // }, 3000);

  
  gameRound.addEventListener("animationend", (e) => {
    if(e.animationName === 'game-round') {
      gameRound.classList.add('hidden');
    }
  });
};

const resetRoundAnimations = () => {
  gameRound.classList.remove('show');
};

const nextRound = () => {
  rounds++;
  resetRoundAnimations();
  setTimeout(() => {
    mainGame.classList.remove('show');
    resetRps();
    startRoundAnimations(rounds);
  }, 5000);
};

// Start Game
start.addEventListener('click', () => {
  startScreen.classList.add('trigger');
  startRoundAnimations(rounds);
});

// Show Info
const infoButton = document.getElementById('info-button');
const info = document.querySelector('.info');

const infoCloseButton = document.getElementById('info-close');
infoButton.addEventListener('click', () => {
  info.classList.add('show');
});
infoCloseButton.addEventListener('click', () => {
  info.classList.remove('show');
});

// Info Content
const infoArrow = document.querySelectorAll('.info-arrow');
const infoPages = document.getElementById('info-page');

const infoContent = [
  {
    title: 'How to Play',
    img: '../img/rps.png',
    p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veritatis provident fugit illo nihil. Exercitationem soluta adipisci dolore eaque labore.'
  },
  {
    title: 'Rules 1',
    img: '../img/rules.png',
    p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veritatis provident fugit illo nihil. Exercitationem soluta adipisci dolore eaque labore.'
  },
  {
    title: 'Rules 2',
    img: '../img/rules.png',
    p: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veritatis provident fugit illo nihil. Exercitationem soluta adipisci dolore eaque labore.'
  }
];

let page = 1;
const totalPages = infoContent.length;
infoPages.textContent = `Page ${page} of ${totalPages}`;
infoArrow[1].classList.add('show');

infoArrow.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if(index === 0) {
      page--;
    } else {
      page++;
    }

    infoPages.textContent = `Page ${page} of ${totalPages}`;

    changeInfoContent(page);

    infoArrow[0].classList.toggle('show', page > 1);
    infoArrow[1].classList.toggle('show', page < totalPages);
  })
});

function changeInfoContent(page) {
  info.querySelector('.info-title h2').textContent = infoContent[page-1].title;
  info.querySelector('.info-img img').src = infoContent[page-1].img;
  info.querySelector('.info-text p').textContent = infoContent[page-1].p;
};

// Player Choose
const rpsOriginRotation = [0, 120, 240];

const rockPaperScissors = document.querySelectorAll('.player-section .circle');
const rockPaperScissorsComputer = document.querySelectorAll('.computer-section .circle');

let playerChoose;

rockPaperScissors.forEach((rps, index) => {
  rps.addEventListener('click', (e) => {
    playerChoose = rps.querySelector('h2').textContent;
    document.documentElement.style.setProperty('--circle-rotation-origin', `${rpsOriginRotation[index]}deg`);
    document.documentElement.style.setProperty('--circle-rotation', '90deg');
    
    rps.parentElement.parentElement.classList.add('remove');

    rps.classList.add('choose');
    rockPaperScissors.forEach((element, idx) => {
      if (idx !== index) {
          element.classList.add('remove');
      }
    });
    
    playGame(rounds);
  })
});

const resetRps = () => {
  rockPaperScissors.forEach((element, index) => {
    element.parentElement.parentElement.classList.remove('remove');
    document.documentElement.style.setProperty('--circle-rotation', `${rpsOriginRotation[index]}deg`);
    element.classList.remove('remove');
    element.classList.remove('choose');
  });

  rockPaperScissorsComputer.forEach((element, index) => {
    element.parentElement.parentElement.classList.remove('remove');
    document.documentElement.style.setProperty('--circle-rotation', `${rpsOriginRotation[index]}deg`);
    element.classList.remove('remove');
    element.classList.remove('choose');
    rockPaperScissorsComputer[index].querySelector('h2').classList.remove('show');
  });

  outcome.parentElement.parentElement.classList.remove('calculate');
}

// ==== Game Logic ====

const getComputerChoice = () => {
  const choice = ['paper', 'scissors', 'rock'];
  let computerRandom = Math.floor(Math.random() * 3);

  document.documentElement.style.setProperty('--circle-rotation-origin-computer', `${rpsOriginRotation[computerRandom]}deg`);
  document.documentElement.style.setProperty('--circle-rotation-computer', '270deg');

  rockPaperScissorsComputer[computerRandom].classList.add('choose');

  rockPaperScissorsComputer[0].parentElement.parentElement.classList.add('remove');

  rockPaperScissorsComputer[computerRandom].querySelector('h2').classList.add('show');
  
  rockPaperScissorsComputer.forEach((element, idx) => {
    if (idx !== computerRandom) {
      element.classList.add('remove');
    }
  });

  return choice[computerRandom];
}

const getHumanChoice = (playerChoose) => {
  playerChoose = playerChoose.toLowerCase();

  if (playerChoose === 'rock' || playerChoose === 'paper' || playerChoose === 'scissors') {
    return playerChoose;
  }
}

let humanScoreCount = 0;
let computerScoreCount = 0;

const outcome = document.getElementById('outcome');
const playerScore = document.getElementById('player-scores');
const computerScore = document.getElementById('computer-scores');

let winnerText = '';

function playRound(humanChoice, computerChoice) {
  console.log(`Player Chooses ${humanChoice}`);
  console.log(`Computer Chooses ${computerChoice}`);
  if (humanChoice === computerChoice) {
    console.log("it's a tie");
    winnerText = "It's a Tie";
    humanScoreCount++;
    computerScoreCount++;
  } else if (
    (humanChoice === 'rock' && computerChoice === 'paper') ||
    (humanChoice === 'paper' && computerChoice === 'scissors') ||
    (humanChoice === 'scissors' && computerChoice === 'rock')
  ) {
    console.log('Computer Wins');
    winnerText = 'Computer Win';
    computerScoreCount++;
  } else {
    console.log('Player Wins');
    winnerText = 'Player Win';
    humanScoreCount++;
  }

  outcome.textContent = winnerText;
  playerScore.textContent = humanScoreCount;
  computerScore.textContent = computerScoreCount;

  outcome.parentElement.parentElement.classList.add('calculate');
}

function playGame(rounds) {
  playRound(getHumanChoice(playerChoose), getComputerChoice());

  if(rounds < 5){
    nextRound();
  };

  if (humanScoreCount === computerScoreCount) {
    console.log(`Shit it's a tie`);
    // tieBreaker();
  } else if (humanScoreCount > computerScoreCount) {
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