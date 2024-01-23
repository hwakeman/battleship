import Ship from '../Ship';

describe('name', () => {
  test('empty name', () => {
    expect(() => new Ship('', 5)).toThrow('Empty Name Error');
  });
});

describe('length', () => {
  test('incorrect length', () => {
    expect(() => new Ship('example-ship', -1)).toThrow(
      'Incorrect Length Error',
    );
  });

  test('incorrect type', () => {
    expect(() => new Ship({ name: 'Jeff' })).toThrow('Type Error');
  });

  test('length of 3', () => {
    const lengthFiveShip = new Ship('example-ship', 3);
    expect(lengthFiveShip.length).toBe(3);
  });

  test('length of 5', () => {
    const lengthFiveShip = new Ship('example-ship', 5);
    expect(lengthFiveShip.length).toBe(5);
  });
});

describe('hit()', () => {
  test('no hits', () => {
    const testShip = new Ship('example-ship', 3);
    expect(testShip.hits).toBe(0);
  });

  test('one hit', () => {
    const testShip = new Ship('example-ship', 3);
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });

  test('multiple hits', () => {
    const testShip = new Ship('example-ship', 3);
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(2);
  });
});

describe('isSunk()', () => {
  test('not sunk (one hit)', () => {
    const testShip = new Ship('example-ship', 3);
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
  });

  test('not sunk (multiple hits)', () => {
    const testShip = new Ship('example-ship', 3);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
  });

  test('sunk (one hit)', () => {
    const testShip = new Ship('example-ship', 1);
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });

  test('sunk (multiple hits)', () => {
    const testShip = new Ship('example-ship', 2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });

  test('sunk (more hits than length)', () => {
    const testShip = new Ship('example-ship', 2);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
