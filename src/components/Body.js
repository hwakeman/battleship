import playerBoard from './board/playerBoard';
import computerBoard from './board/computerBoard';
import BoardButtons from './board/BoardButtons';

export default function Body(playerBoardArr, computerBoardArr, playerName) {
  const body = document.createElement('div');
  body.classList.add('body');

  const winMessage = document.createElement('div');
  winMessage.classList.add('win-message');
  winMessage.innerHTML = `Welcome to Battleship ${playerName}!`;

  const playerLabel = document.createElement('div');
  playerLabel.classList.add('player-label');
  playerLabel.classList.add('board-labels');
  playerLabel.innerHTML = 'Player Board';

  const computerLabel = document.createElement('div');
  computerLabel.classList.add('computer-label');
  computerLabel.classList.add('board-labels');
  computerLabel.innerHTML = 'Computer Board';

  const boards = document.createElement('div');
  boards.classList.add('boards');
  boards.appendChild(playerLabel);
  boards.appendChild(computerLabel);
  boards.appendChild(playerBoard(playerBoardArr));
  boards.appendChild(computerBoard(computerBoardArr));

  body.appendChild(winMessage);
  body.appendChild(boards);
  body.appendChild(BoardButtons());

  return body;
}
