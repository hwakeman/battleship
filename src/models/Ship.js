export default class Ship {
    constructor(name, length) {
        if(length < 0) throw new Error('Negative Length Error')
        if(typeof name !== 'string') throw new Error('Type Error')
        if(typeof length !== 'number') throw new Error('Type Error')

        this.name = name
        this.length = length
        this.hits = 0
    }

    hit() {
        this.hits++
    }

    isSunk() {
        if(this.length <= this.hits) return true
        else return false
    }


}