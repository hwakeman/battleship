import Board from './board/Board';
import BoardButtons from './board/BoardButtons';

export default function Body() {
  const body = document.createElement('div')
  body.classList.add('body')

  body.appendChild(Board())
  body.appendChild(BoardButtons())

  return body
}