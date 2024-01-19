export default function playerBoard(playerBoardArr) {
  const board = document.createElement('table');
  board.classList.add('player-board');

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('tr');
    for (let j = 0; j < 10; j += 1) {
      const td = document.createElement('td');
      if (playerBoardArr[i][j] === 'X') {
        td.innerHTML = 'X';
      } else if (playerBoardArr[i][j] === 'O') {
        td.innerHTML = 'O';
      } else if (playerBoardArr[i][j] !== '') {
        td.innerHTML = '🛳';
      }
      row.appendChild(td);
    }
    board.appendChild(row);
  }

  return board;
}
