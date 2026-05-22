const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {

  const element = document.createElement(tag);

  element.className = className;

  return element;
};

let firstCard = '';
let secondCard = '';
let loop;

const checkEndGame = () => {

  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {

    clearInterval(loop);

    saveBestTime();

    showWinScreen();
  }
};

const checkCards = () => {

  const firstCharacter =
    firstCard.getAttribute('data-character');

  const secondCharacter =
    secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {

    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 700);
  }
};

const revealCard = ({ target }) => {

  const card = target.parentNode;

  if (card.classList.contains('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    card.classList.add('reveal-card');

    firstCard = card;

  } else if (secondCard === '') {

    card.classList.add('reveal-card');

    secondCard = card;

    checkCards();
  }
};

const createCard = (character) => {

  const card = createElement('div', 'card');

  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage =
    `url('${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);

  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {

  const duplicateCharacters = [
    ...characters,
    ...characters
  ];

  const shuffledArray =
    duplicateCharacters.sort(
      () => Math.random() - 0.5
    );

  shuffledArray.forEach((character) => {

    const card = createCard(character);

    grid.appendChild(card);
  });
};

const startTimer = () => {

  loop = setInterval(() => {

    const currentTime = +timer.innerHTML;

    timer.innerHTML = currentTime + 1;

  }, 1000);
};

const showWinScreen = () => {

  const div = document.createElement('div');

  div.className = 'win-screen';

  const best = localStorage.getItem('bestTime');

  div.innerHTML = `
    <h1>🏆 Vitória!</h1>

    <p>
      ${spanPlayer.innerHTML},
      seu tempo foi: ${timer.innerHTML}s
    </p>

    <p>
      🏅 Melhor tempo: ${best}s
    </p>

    <button onclick="location.reload()">
      Jogar novamente
    </button>
  `;

  document.body.appendChild(div);
};

const saveBestTime = () => {

  const best = localStorage.getItem('bestTime');

  if (!best || timer.innerHTML < best) {

    localStorage.setItem(
      'bestTime',
      timer.innerHTML
    );
  }
};

window.onload = () => {

  spanPlayer.innerHTML =
    localStorage.getItem('player');

  startTimer();

  loadGame();
};