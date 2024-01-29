import './app.css';

import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import nameForm from './components/nameForm';
import Gameboard from './models/Gameboard';
import Player from './models/Player';
import Ship from './models/Ship';

const emptyBoardArr = new Array(10).fill('').map(() => new Array(10).fill(''));

let playerName = 'Player';

let playerShipsArr = [
  new Ship('carrier', 5),
  new Ship('battleship', 4),
  new Ship('cruiser', 3),
  new Ship('submarine', 3),
  new Ship('destroyer', 2),
];
let computerShipsArr = [
  new Ship('carrier', 5),
  new Ship('battleship', 4),
  new Ship('cruiser', 3),
  new Ship('submarine', 3),
  new Ship('destroyer', 2),
];
let shipsArrIndex = 0;

document.getElementById('content').appendChild(Header());
document
  .getElementById('content')
  .appendChild(Body(emptyBoardArr, emptyBoardArr, playerName));
document.getElementById('content').appendChild(Footer());
document.getElementById('name-form').appendChild(nameForm());

const submitButton = document.getElementsByClassName('submit-button')[0];
const nameInput = document.getElementsByClassName('name-input')[0];
let player;
let computer;

submitButton.addEventListener('click', () => {
  playerName = nameInput.value;
  if (playerName === '') playerName = 'Player';
  player = new Player(playerName);
  computer = new Player('computer');
  player.setEnemyPlayer(computer);
  computer.setEnemyPlayer(player);
  document.getElementsByClassName('win-message')[0].innerHTML =
    `Welcome to Battleship ${playerName}!`;
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
    playerBoardBoxes[x][y].addEventListener('mouseenter', () =>
      playerBoxHoverHandler(x, y),
    );
    playerBoardBoxes[x][y].addEventListener('mouseout', () =>
      playerBoxUnhoverHandler(),
    );
  }

  const playerBoxClickHandler = (x, y) => {
    player.playerBoard.place(
      playerShipsArr[shipsArrIndex],
      y,
      Math.abs(x - 9),
      horizontalShips,
    );
    computer.placeShipRandomly(computerShipsArr[shipsArrIndex]);
    shipsArrIndex += 1;
    document.getElementsByClassName('body')[0].innerHTML = '';
    document
      .getElementsByClassName('body')[0]
      .appendChild(
        Body(player.playerBoard.board, computer.playerBoard.board, playerName),
      );
    updateEventListeners();
  };

  const playerBoxHoverHandler = (x, y) => {
    if (horizontalShips) {
      for (let i = y; i < y + playerShipsArr[shipsArrIndex].length; i += 1) {
        playerBoardBoxes[x][i].classList.add('green');
      }
    } else {
      for (
        let index = x;
        index > x - playerShipsArr[shipsArrIndex].length;
        index -= 1
      ) {
        playerBoardBoxes[index][y].classList.add('green');
      }
    }
  };

  const playerBoxUnhoverHandler = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        playerBoardBoxes[i][j].classList.remove('green');
      }
    }
  };

  const rotateButton = document.getElementsByClassName('rotate-button')[0];
  rotateButton.addEventListener('click', () => {
    horizontalShips = !horizontalShips;
  });

  const resetButton = document.getElementsByClassName('reset-button')[0];
  resetButton.addEventListener('click', () => {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').appendChild(Header());
    document
      .getElementById('content')
      .appendChild(Body(emptyBoardArr, emptyBoardArr, playerName));
    document.getElementById('content').appendChild(Footer());
    updateEventListeners();
    shipsArrIndex = 0;
    horizontalShips = true;
    player.playerBoard = new Gameboard(10, 10);
    computer.playerBoard = new Gameboard(10, 10);
    playerShipsArr = [
      new Ship('carrier', 5),
      new Ship('battleship', 4),
      new Ship('cruiser', 3),
      new Ship('submarine', 3),
      new Ship('destroyer', 2),
    ];
    computerShipsArr = [
      new Ship('carrier', 5),
      new Ship('battleship', 4),
      new Ship('cruiser', 3),
      new Ship('submarine', 3),
      new Ship('destroyer', 2),
    ];
  });

  if (shipsArrIndex === 5) updateComputerBoardEventListeners();
}

function updateComputerBoardEventListeners() {
  const computerBoardBoxesTemp = document.querySelectorAll(
    '.computer-board tr td',
  );
  const computerBoardBoxes = [];
  for (let i = 0; i < 10; i += 1) {
    computerBoardBoxes[i] = [];

    for (let j = 0; j < 10; j += 1) {
      computerBoardBoxes[i][j] = computerBoardBoxesTemp[i * 10 + j];
    }
  }

  for (let i = 0; i < computerBoardBoxesTemp.length; i += 1) {
    const x = Math.floor(i / 10);
    const y = i % 10;
    computerBoardBoxes[x][y].addEventListener('click', () =>
      computerBoxClickHandler(x, y),
    );
    computerBoardBoxes[x][y].addEventListener('mouseenter', () =>
      computerBoxHoverHandler(x, y),
    );
    computerBoardBoxes[x][y].addEventListener('mouseout', () =>
      computerBoxUnhoverHandler(),
    );
  }

  const computerBoxClickHandler = (x, y) => {
    try {
      computer.playerBoard.receiveAttack(y, Math.abs(x - 9));
      computer.playRandomMove();
      document.getElementsByClassName('body')[0].innerHTML = '';
      document
        .getElementsByClassName('body')[0]
        .appendChild(
          Body(
            player.playerBoard.board,
            computer.playerBoard.board,
            playerName,
          ),
        );
      updateEventListeners();
      if (
        computer.playerBoard.allShipsSunk() ||
        player.playerBoard.allShipsSunk()
      ) {
        document.getElementsByClassName('body')[0].innerHTML = '';
        document
          .getElementsByClassName('body')[0]
          .appendChild(
            Body(
              player.playerBoard.board,
              computer.playerBoard.board,
              playerName,
            ),
          );
        const winMessage = document.getElementsByClassName('win-message')[0];
        if (
          computer.playerBoard.allShipsSunk() &&
          player.playerBoard.allShipsSunk()
        ) {
          winMessage.innerHTML = 'Tie!';
        } else if (computer.playerBoard.allShipsSunk()) {
          winMessage.innerHTML = `${playerName} wins!`;
        } else {
          winMessage.innerHTML = 'Computer wins!';
        }
        updateEventListeners();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const computerBoxHoverHandler = (x, y) => {
    computerBoardBoxes[x][y].classList.add('red');
  };

  const computerBoxUnhoverHandler = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        computerBoardBoxes[i][j].classList.remove('red');
      }
    }
  };
}
