export default function BoardButtons() {
  const boardButtons = document.createElement('div');
  boardButtons.classList.add('board-buttons');

  const rotateButton = document.createElement('button');
  rotateButton.classList.add('board-button');
  rotateButton.innerHTML = 'Rotate';

  boardButtons.appendChild(rotateButton);
  return boardButtons;
}
