'use strict';

const HashMap = require('./HashMap'); 

function main(){
  const lotr = new HashMap(); 
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
}

// main(); 

//1. 
//a. Yes, but some were overwritten.
//b. Sauron and Frodo, replaced the previously written values at those keys
//c. 24, Capacity was tripled when the size was over run.

//2. 20 and 10 because the same key is being used and overwritten. 

function duplicates(string) {
  const hash = new HashMap();
  let str = string.split('').reverse().join(''); 
  for (let i = 0; i < str.length; i++) {
    let element = str[i];
    hash.set(element, element); 
  }
  console.log(hash);
}

duplicates('google'); 

