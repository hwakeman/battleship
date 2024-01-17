import Player from "../Player";
import Ship from "../Ship";

let examplePlayer = new Player('Cool Guy')

beforeAll(() => {
    examplePlayer = new Player('Cool Guy')
})

test('player name', () => {
    expect(examplePlayer.name).toBe('Cool Guy')
})

test('player board', () => {
    const exampleShip = new Ship('example-ship', 5)
    const x = 3
    const y = 3
    examplePlayer.playerBoard.place(exampleShip, x, y, true)
    const realYValue = examplePlayer.playerBoard.board.length - y - 1
    expect(examplePlayer.playerBoard.board[realYValue][x]).toBe('example-ship')
})