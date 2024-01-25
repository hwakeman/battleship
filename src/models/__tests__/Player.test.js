import Player from '../Player';
import Ship from '../Ship';

let examplePlayer;

beforeEach(() => {
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

test('random ship place', () => {
  console.log(examplePlayer.playerBoard.shipList);
  const exampleShip = new Ship('example-ship', 5);
  examplePlayer.placeShipRandomly(exampleShip);
  expect(examplePlayer.playerBoard.shipList.length).toBe(1);
  const boardArr = examplePlayer.playerBoard.board
    .flat()
    .filter((element) => element !== '').length;
  expect(boardArr).toBe(5);
});
