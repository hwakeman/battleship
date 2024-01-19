export default function computerBoard(computerBoardArr) {
  const board = document.createElement('table');
  board.classList.add('computer-board');

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('tr');
    for (let j = 0; j < 10; j += 1) {
      const td = document.createElement('td');
      if (computerBoardArr[i][j] === 'X') {
        td.innerHTML = 'X';
      }
      if (computerBoardArr[i][j] === 'O') {
        td.innerHTML = 'O';
      }
      row.appendChild(td);
    }
    board.appendChild(row);
  }

  return board;
}
