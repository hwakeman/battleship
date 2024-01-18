import Ship from "../Ship";
import Gameboard from "../Gameboard";

describe("board initialization", () => {
  const exampleGameboard = new Gameboard(10, 10);
  test("board filled with empty string", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(exampleGameboard.board[i][j]).toBe("");
      }
    }
  });

  test("ship list empty", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(exampleGameboard.shipList.length).toBe(0);
      }
    }
  });
});

describe("placing ship", () => {
  test("placing ship of length 3", () => {
    const exampleShip = new Ship("example-ship", 3);
    const exampleGameboard = new Gameboard(10, 10);
    const x = 3;
    const y = 5;
    const realYValue = exampleGameboard.board.length - y - 1;
    exampleGameboard.place(exampleShip, x, y, true);
    expect(exampleGameboard.board[realYValue][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 1]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 2]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 3]).toBe("");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 3));
  });

  test("placing ship of length 5", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleGameboard = new Gameboard(10, 10);
    const x = 4;
    const y = 6;
    const realYValue = exampleGameboard.board.length - y - 1;
    exampleGameboard.place(exampleShip, x, y, true);
    expect(exampleGameboard.board[realYValue][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 1]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 2]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 3]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 4]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue][x + 5]).toBe("");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 5));
  });

  test("placing vertical ship", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleGameboard = new Gameboard(10, 10);
    const x = 4;
    const y = 4;
    const realYValue = exampleGameboard.board.length - y - 1;
    exampleGameboard.place(exampleShip, x, y, false);
    expect(exampleGameboard.board[y][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue - 1][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue - 2][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue - 3][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue - 4][x]).toBe("example-ship");
    expect(exampleGameboard.board[realYValue - 5][x]).toBe("");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 5));
  });

  test("placing ship onto another", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleShip2 = new Ship("example-ship-2", 5);
    const exampleGameboard = new Gameboard(10, 10);
    exampleGameboard.place(exampleShip, 3, 4, true);
    expect(() => {
      exampleGameboard.place(exampleShip2, 4, 2, false);
    }).toThrow("Ship Overlap Error");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 5));
  });

  test("placing ship off the board (horizontal)", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleGameboard = new Gameboard(10, 10);
    expect(() => {
      exampleGameboard.place(exampleShip, 7, 7, true);
    }).toThrow("Ship Off Board Error");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 5));
  });

  test("placing ship off the board (vertical)", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleGameboard = new Gameboard(10, 10);
    expect(() => {
      exampleGameboard.place(exampleShip, 2, 6, false);
    }).toThrow("Ship Off Board Error");
    expect(exampleGameboard.shipList[0]).toEqual(new Ship("example-ship", 5));
  });
});

describe("receiveAttack()", () => {
  test("incorrect type", () => {
    const exampleGameboard = new Gameboard(10, 10);
    expect(() => exampleGameboard.receiveAttack("wrong type", 5)).toThrow(
      "Type Error",
    );
    expect(() => exampleGameboard.receiveAttack(true, 5)).toThrow("Type Error");
    expect(() => exampleGameboard.receiveAttack(5, 3.14)).toThrow("Type Error");
  });

  test("hit out of bounds", () => {
    const exampleGameboard = new Gameboard(10, 10);
    expect(() => exampleGameboard.receiveAttack(11, 11)).toThrow(
      "Attack Out Of Bounds Error",
    );
  });

  test("receives hit", () => {
    const exampleShip = new Ship("example-ship", 5);
    const exampleGameboard = new Gameboard(10, 10);

    exampleGameboard.place(exampleShip, 3, 3, true);
    exampleGameboard.receiveAttack(3, 3);
    expect(exampleGameboard.shipList[0].hits).toBe(1);
  });
});

describe("allShipsSunk()", () => {
  let exampleShip = new Ship("example-ship", 2);
  let exampleShip2 = new Ship("example-ship-2", 2);
  let exampleGameboard = new Gameboard(10, 10);

  beforeEach(() => {
    exampleShip = new Ship("example-ship", 2);
    exampleShip2 = new Ship("example-ship-2", 2);
    exampleGameboard = new Gameboard(10, 10);
    exampleGameboard.place(exampleShip, 3, 3, true);
    exampleGameboard.place(exampleShip, 3, 4, true);
  });

  test("all not sunk", () => {
    exampleGameboard.receiveAttack(3, 3);
    exampleGameboard.receiveAttack(4, 3);
    expect(exampleGameboard.allShipsSunk()).toBeFalsy;
  });

  test("all sunk", () => {
    exampleGameboard.receiveAttack(3, 3);
    exampleGameboard.receiveAttack(4, 3);
    exampleGameboard.receiveAttack(3, 4);
    exampleGameboard.receiveAttack(4, 4);
    expect(exampleGameboard.allShipsSunk()).toBeFalsy;
  });

  test("add new ship (all not sunk)", () => {
    exampleGameboard.receiveAttack(3, 3);
    exampleGameboard.receiveAttack(4, 3);
    exampleGameboard.receiveAttack(3, 4);
    exampleGameboard.receiveAttack(4, 4);

    exampleGameboard.place(exampleShip, 3, 5, true);
    expect(exampleGameboard.allShipsSunk()).toBeFalsy;
  });
});
