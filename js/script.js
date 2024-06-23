// Interactive Section //
const start = document.getElementById('start-game');
const startScreen = document.querySelector('.start');
const gameRound = document.getElementById('game-round');
const mainGame = document.getElementById('main-game');

// Round section
let round = 1;

const startRoundAnimations = (round) => {
  const roundText = document.querySelectorAll('.round');
  roundText.forEach(text => {
    text.textContent = round;
  });

  gameRound.classList.add('show');
  setTimeout(() => {
    mainGame.classList.add('show');
  }, 2000);
};

const resetRoundAnimations = () => {
  gameRound.classList.remove('show');
  mainGame.classList.remove('show');
};

gameRound.addEventListener("animationend", (e) => {
  if(e.animationName === 'game-round') {
    gameRound.classList.add('hidden');
  }
});

const nextRound = () => {
  round++;
  resetRoundAnimations();
  startRoundAnimations(round);
};

// Start Game
start.addEventListener('click', () => {
  startScreen.classList.add('trigger');
  startRoundAnimations(round);
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

let playerChoose;

rockPaperScissors.forEach((rps, index) => {
  rps.addEventListener('click', (e) => {
    playerChoose = rps;
    document.documentElement.style.setProperty('--circle-rotation-origin', `${rpsOriginRotation[index]}deg`);
    document.documentElement.style.setProperty('--circle-rotation', '90deg');
    
    rps.parentElement.parentElement.classList.add('remove');

    playerChoose.classList.add('choose');
    rockPaperScissors.forEach((element, idx) => {
      if (idx !== index) {
          element.classList.add('remove');
      }
    });
  })
});