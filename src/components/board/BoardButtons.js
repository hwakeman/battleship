export default function BoardButtons() {
  const boardButtons = document.createElement('div');
  boardButtons.classList.add('board-buttons');

  const rotateButton = document.createElement('button');
  rotateButton.classList.add('board-button');
  rotateButton.classList.add('rotate-button');
  rotateButton.innerHTML = 'Rotate';

  const resetButton = document.createElement('button');
  resetButton.classList.add('board-button');
  resetButton.classList.add('reset-button');
  resetButton.innerHTML = 'Reset game';

  boardButtons.appendChild(rotateButton);
  boardButtons.appendChild(resetButton);
  return boardButtons;
}
