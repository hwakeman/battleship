export default class Ship {
  constructor(name, length) {
    if (length <= 0) throw new Error('Incorrect Length Error');
    if (name === '') throw new Error('Empty Name Error');
    if (typeof name !== 'string') throw new Error('Type Error');
    if (typeof length !== 'number') throw new Error('Type Error');

    this.name = name;
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.length <= this.hits) return true;
    return false;
  }
}
