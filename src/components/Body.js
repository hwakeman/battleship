import Board from './board/Board';
import BoardButtons from './board/BoardButtons';

export default function Body() {
  const body = document.createElement('div');
  body.classList.add('body');

  const boards = document.createElement('div');
  boards.classList.add('boards');
  boards.appendChild(Board());
  boards.appendChild(Board());

  body.appendChild(boards);
  body.appendChild(BoardButtons());

  return body;
}
