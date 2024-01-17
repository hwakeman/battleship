import Ship from "./models/Ship";
import Gameboard from "./models/Gameboard";

let ship = new Ship('destroyer', 5)
let gameboard = new Gameboard(10, 10)

gameboard.place(ship, 3, 4, false)

console.log(gameboard)