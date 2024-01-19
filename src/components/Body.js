import playerBoard from './board/playerBoard';
import computerBoard from './board/computerBoard';
import BoardButtons from './board/BoardButtons';

export default function Body(playerBoardArr, computerBoardArr) {
  const body = document.createElement('div');
  body.classList.add('body');

  const boards = document.createElement('div');
  boards.classList.add('boards');
  boards.appendChild(playerBoard(playerBoardArr));
  boards.appendChild(computerBoard(computerBoardArr));

  body.appendChild(boards);
  body.appendChild(BoardButtons());

  return body;
}
