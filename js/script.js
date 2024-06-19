// Interactive Section //
const start = document.getElementById('start-game');
const startScreen = document.querySelector('.start');
const gameRound = document.getElementById('game-round');
const gameRoundText = document.querySelector('#game-round h1');
const rpsRotate = document.querySelectorAll('.rock-paper-scissors');
const rpsScale = document.querySelectorAll('.rock-paper-scissors-wrapper');
const rpsCirclePlayer = document.querySelectorAll('.player-section .circle');
const rpsCircleComputer = document.querySelectorAll('.computer-section .circle');

start.addEventListener('click', () => {
  startScreen.classList.add('trigger');
  gameRound.style.animation = 'game-round 1s ease 2s forwards';
  gameRoundText.style.animation = 'game-round-text 0s ease 1s forwards';
  startRoundAnimations();
});

const startRoundAnimations = () => {
  setTimeout(() => {
    rpsRotate.forEach((rpsElement, index) => {
      rpsElement.style.animation = 'rock-paper-scissors 1.5s ease forwards';
      rpsScale[index].style.animation = 'rock-paper-scissors-wrapper 1.5s ease forwards';
      rpsElement.classList.add('border');
    });
    
    rpsCirclePlayer.forEach((circleElement, index) => {
      circleElement.style.animation = `rps-circle-${index+1} 1.5s ease .5s forwards`;
      rpsCircleComputer[index].style.animation = `rps-circle-${index+1} 1.5s ease .5s forwards`;
      circleElement.classList.add('show');

      const textElement = circleElement.querySelector('h2');
      textElement.style.transform = `rotate(-${index * 120}deg)`;
    });
  }, 2000);
}

gameRound.addEventListener("animationend", (e) => {
  console.log(e.animationName);
  if (e.animationName === 'game-round') {
    gameRound.classList.add('hidden');
  }
});

// Round section
const roundText = document.querySelectorAll('.round');
roundText.forEach(round => {
  round.textContent = 2;
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
})

// Player Choose
const playerPaper = document.getElementById('paper');
const playerScissors = document.getElementById('scissors');
const playerRock = document.getElementById('rock');
playerPaper.addEventListener('click', (e) => {
  playerPaper.classList.add('choose');
  playerScissors.classList.add('remove');
  playerRock.classList.add('remove');
});