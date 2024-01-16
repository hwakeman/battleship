import Ship from "../Ship";
import Gameboard from "../Gameboard";

describe('placing ship', () => { 
    test('placing ship of length 3', () => { 
        const exampleShip = new Ship('example-ship', 3)
        const exampleGameboard = new Gameboard()
        exampleGameboard.place(exampleShip, 3, 5, true)
        expect(exampleGameboard.board[3][5]).toBe('example-ship')
        expect(exampleGameboard.board[3][6]).toBe('example-ship')
        expect(exampleGameboard.board[3][7]).toBe('example-ship')
        expect(exampleGameboard.board[3][8]).toBe('')
    })

    test('placing ship of length 5', () => { 
        const exampleShip = new Ship('example-ship', 5)
        const exampleGameboard = new Gameboard()
        exampleGameboard.place(exampleShip, 3, 4, true)
        expect(exampleGameboard.board[3][4]).toBe('example-ship')
        expect(exampleGameboard.board[3][5]).toBe('example-ship')
        expect(exampleGameboard.board[3][6]).toBe('example-ship')
        expect(exampleGameboard.board[3][7]).toBe('example-ship')
        expect(exampleGameboard.board[3][8]).toBe('example-ship')
        expect(exampleGameboard.board[3][9]).toBe('')
    })
})
