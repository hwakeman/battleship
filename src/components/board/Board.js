export default function Board() {
  const board = document.createElement('table');
  board.classList.add('board');

  for (let j = 0; j < 10; j += 1) {
    const row = document.createElement('tr');
    for (let i = 0; i < 10; i += 1) {
      const td = document.createElement('td');
      row.appendChild(td);
    }
    board.appendChild(row);
  }

  return board;
}
