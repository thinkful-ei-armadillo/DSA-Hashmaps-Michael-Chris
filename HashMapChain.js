const LinkedList = require('./LinkedList');

class HashMapChain {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const node = this._findNode(key);
    if (node === null) {
      throw new Error('Key error');
    }
    return node.value;
  }

  set(key, value){
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    if (this._hashTable[index] === undefined) {
      this._hashTable[index] = new LinkedList();
    }

    if (this._findNode(key) === null) {
      this.length++;
      this._hashTable[index].insertLast({
        key,
        value,
        deleted: false
      });
    } else {
      let node = this._hashTable[index].find(key);
      node.value = { key, value, deleted: false };
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    this._hashTable[index].delete(key);
  }

  _findNode(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] !== undefined) {
      const response = this._hashTable[index].find(key);
      return response;
    } else {
      return null;
    }
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    return hash % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.value.key, currNode.value.value);
          currNode = currNode.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMapChain.MAX_LOAD_RATIO = 0.5;
HashMapChain.SIZE_RATIO = 3;

let lotr = new HashMapChain();

lotr.set('Hobbit', 'Bilbo');
lotr.set('Hobbit', 'Frodo');
lotr.set('Wizard', 'Gandolf');
lotr.set('Human', 'Aragon');
lotr.set('Elf', 'Legolas');
lotr.set('Maiar', 'The Necromancer');
lotr.set('Maiar', 'Sauron');
lotr.set('RingBearer', 'Gollum');
lotr.set('LadyOfLight', 'Galadriel');
lotr.set('HalfElven', 'Arwen');
lotr.set('Ent', 'Treebeard');

console.log(lotr);