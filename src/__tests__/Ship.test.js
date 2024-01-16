import Ship from "../Ship";

describe('length', () => {
    test('negative length', () => {
        expect(() => new Ship(-1)).toThrow('Negative Length Error')
    })

    test('incorrect type', () => {
        expect(() => new Ship({"name": 'Jeff'})).toThrow('Type Error')
    })

    test('length of 3', () => {
        let lengthFiveShip = new Ship(3)
        expect(lengthFiveShip.length).toBe(3)
    })

    test('length of 5', () => {
        let lengthFiveShip = new Ship(5)
        expect(lengthFiveShip.length).toBe(5)
    })
})

describe('hit()', () => {
    test('no hits', () => {
        let testShip = new Ship(3)
        expect(testShip.hits).toBe(0)
    })

    test('one hit', () => {
        let testShip = new Ship(3)
        testShip.hit()
        expect(testShip.hits).toBe(1)
    })

    test('multiple hits', () => {
        let testShip = new Ship(3)
        testShip.hit()
        testShip.hit()
        expect(testShip.hits).toBe(2)
    })
})

describe('isSunk()', () => {
    test('not sunk (one hit)', () => {
        let testShip = new Ship(3)
        testShip.hit()
        expect(testShip.isSunk()).toBeFalsy()
    })

    test('not sunk (multiple hits)', () => {
        let testShip = new Ship(3)
        testShip.hit()
        testShip.hit()
        expect(testShip.isSunk()).toBeFalsy()
    })

    test('sunk (one hit)', () => {
        let testShip = new Ship(1)
        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()
    })

    test('sunk (multiple hits)', () => {
        let testShip = new Ship(2)
        testShip.hit()
        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()
    })

    test('sunk (more hits than length)', () => {
        let testShip = new Ship(2)
        testShip.hit()
        testShip.hit()
        testShip.hit()
        expect(testShip.isSunk()).toBeTruthy()
    })
})