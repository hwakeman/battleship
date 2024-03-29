import Ship from './Ship';

export default class Gameboard {
  constructor(width, height) {
    this.board = Array.from({ length: width }, () => Array(height).fill(''));
    this.shipList = [];
  }

  place(ship, x, y, isHorizontal) {
    if (
      !(ship instanceof Ship) ||
      typeof x !== 'number' ||
      x < 0 ||
      x % 1 !== 0 ||
      typeof y !== 'number' ||
      y < 0 ||
      y % 1 !== 0 ||
      typeof isHorizontal !== 'boolean'
    ) {
      throw new Error('Type Error');
    }

    const realYValue = this.board.length - y - 1;
    if (isHorizontal) {
      if (x + ship.length > this.board[0].length) {
        throw new Error('Ship Off Board Error');
      }

      for (let index = x; index < x + ship.length; index += 1) {
        if (this.board[realYValue][index] !== '') {
          throw new Error('Ship Overlap Error');
        }
      }

      for (let index = x; index < x + ship.length; index += 1) {
        this.board[realYValue][index] = ship.name;
      }
    } else {
      if (y + ship.length > 10) {
        throw new Error('Ship Off Board Error');
      }

      for (
        let index = realYValue;
        index > realYValue - ship.length;
        index -= 1
      ) {
        if (this.board[index][x] !== '') {
          throw new Error('Ship Overlap Error');
        }
      }

      for (
        let index = realYValue;
        index > realYValue - ship.length;
        index -= 1
      ) {
        this.board[index][x] = ship.name;
      }
    }
    this.shipList.push(ship);
  }

  receiveAttack(x, y) {
    if (
      typeof x !== 'number' ||
      x % 1 !== 0 ||
      typeof y !== 'number' ||
      y % 1 !== 0
    ) {
      throw new Error('Type Error');
    }

    if (x >= this.board[0].length || y >= this.board.length) {
      throw new Error('Attack Out Of Bounds Error');
    }

    const realYValue = this.board.length - y - 1;
    if (
      this.board[realYValue][x] === 'X' ||
      this.board[realYValue][x] === 'O'
    ) {
      throw new Error('Attack Repeat Error');
    } else if (this.board[realYValue][x] === '') {
      this.board[realYValue][x] = 'X';
    } else {
      const hitName = this.board[realYValue][x];
      this.shipList.forEach((ship) => {
        if (ship.name === hitName) {
          ship.hit();
          this.board[realYValue][x] = 'O';
        }
      });
    }
  }

  allShipsSunk() {
    let areAllShipsSunk = true;
    this.shipList.forEach((ship) => {
      if (!ship.isSunk()) areAllShipsSunk = false;
    });
    return areAllShipsSunk;
  }
}
