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

    this.shipList.push(ship);
    if (isHorizontal) {
      if (x + ship.length > this.board[0].length) {
        throw new Error('Ship Off Board Error');
      }

      const realYValue = this.board.length - y - 1;
      for (let index = x; index < x + ship.length; index += 1) {
        if (this.board[realYValue][index] !== '') {
          throw new Error('Ship Overlap Error');
        }

        this.board[realYValue][index] = ship.name;
      }
    } else {
      if (y - ship.length > 0) {
        throw new Error('Ship Off Board Error');
      }

      const realYValue = this.board.length - y - 1;
      for (
        let index = realYValue;
        index > realYValue - ship.length;
        index -= 1
      ) {
        if (this.board[index][x] !== '') {
          throw new Error('Ship Overlap Error');
        }

        this.board[index][x] = ship.name;
      }
    }
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
    if (this.board[realYValue][x] !== '') {
      const hitName = this.board[realYValue][x];
      this.shipList.forEach((ship) => {
        if (ship.name === hitName) {
          ship.hit();
          this.board[realYValue][x] = 'O';
        }
      });
    } else {
      this.board[realYValue][x] = 'X';
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
