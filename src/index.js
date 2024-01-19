import './app.css';

import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import nameForm from './components/nameForm';
import Player from './models/Player';
import Ship from './models/Ship';

const playerArr = new Array(10).fill('').map(() => new Array(10).fill(''));
const computerArr = new Array(10).fill('').map(() => new Array(10).fill(''));

const shipsArr = [
  new Ship('carrier', 5),
  new Ship('battleship', 4),
  new Ship('cruiser', 3),
  new Ship('submarine', 3),
  new Ship('destroyer', 2),
];
let shipsArrIndex = 0;

console.log(playerArr);

document.getElementById('content').appendChild(Header());
document.getElementById('content').appendChild(Body(playerArr, computerArr));
document.getElementById('content').appendChild(Footer());
document.getElementById('content').appendChild(nameForm());

const submitButton = document.getElementsByClassName('submit-button')[0];
const nameInput = document.getElementsByClassName('name-input')[0];
let playerName;
let player;
let computer;
submitButton.addEventListener('click', () => {
  playerName = nameInput.value;
  player = new Player(playerName);
  computer = new Player('computer');
  player.setEnemyPlayer(computer);
});

let horizontalShips = true;

updateEventListeners();

function updateEventListeners() {
  const playerBoardBoxesTemp = document.querySelectorAll('.player-board tr td');
  const playerBoardBoxes = [];
  for (let i = 0; i < 10; i += 1) {
    playerBoardBoxes[i] = [];

    for (let j = 0; j < 10; j += 1) {
      playerBoardBoxes[i][j] = playerBoardBoxesTemp[i * 10 + j];
    }
  }

  for (let i = 0; i < playerBoardBoxesTemp.length; i += 1) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    playerBoardBoxes[x][y].addEventListener('click', () =>
      playerBoxClickHandler(x, y),
    );
  }

  const playerBoxClickHandler = (x, y) => {
    player.playerBoard.place(
      shipsArr[shipsArrIndex],
      y,
      Math.abs(x - 9),
      horizontalShips,
    );
    shipsArrIndex += 1;
    document.getElementsByClassName('body')[0].innerHTML = '';
    document
      .getElementsByClassName('body')[0]
      .appendChild(Body(player.playerBoard.board, computer.playerBoard.board));
    updateEventListeners();
  };

  const rotateButton = document.getElementsByClassName('rotate-button')[0];
  rotateButton.addEventListener('click', () => {
    horizontalShips = !horizontalShips;
  });
}
