import Player from '../Player';
import Ship from '../Ship';

let examplePlayer = new Player('Cool Guy');
beforeAll(() => {
  examplePlayer = new Player('Cool Guy');
});

test('player name', () => {
  expect(examplePlayer.name).toBe('Cool Guy');
});

test('player board', () => {
  const exampleShip = new Ship('example-ship', 5);
  const x = 3;
  const y = 3;
  examplePlayer.playerBoard.place(exampleShip, x, y, true);
  const realYValue = examplePlayer.playerBoard.board.length - y - 1;
  expect(examplePlayer.playerBoard.board[realYValue][x + 1]).toBe(
    'example-ship',
  );
});

test('enemy player', () => {
  const examplePlayer2 = new Player('Enemy');
  examplePlayer.setEnemyPlayer(examplePlayer2);
  expect(examplePlayer.enemyPlayer.name).toBe('Enemy');
});

test('random move', () => {
  const examplePlayer2 = new Player('Enemy');
  examplePlayer.setEnemyPlayer(examplePlayer2);
  examplePlayer.playRandomMove();
  const enemyBoard = examplePlayer.enemyPlayer.playerBoard.board;
  expect(enemyBoard.some((row) => row.includes('X'))).toBeTruthy();
});
