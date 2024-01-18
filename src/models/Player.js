import Gameboard from "./Gameboard.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard(10, 10);
    this.enemyPlayer = null;
  }

  setEnemyPlayer(player) {
    if (!(player instanceof Player)) throw new Error("Type Error");
    this.enemyPlayer = player;
  }

  playRandomMove() {
    const enemyBoard = this.enemyPlayer.playerBoard;
    const randomXValue = this.getRandomInt(0, enemyBoard.board[0].length);
    const randomYValue = this.getRandomInt(0, enemyBoard.board.length);
    const realYValue = enemyBoard.board.length - randomYValue - 1;
    if (enemyBoard.board[realYValue][randomXValue] !== "X") {
      enemyBoard.receiveAttack(randomXValue, randomYValue);
    } else {
      this.playRandomMove();
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
