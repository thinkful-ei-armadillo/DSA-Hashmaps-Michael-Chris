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

//4
function duplicates(string) {
  const hash = new HashMap();
  let result = '';
  for(let i = 0; i < string.length; i++) {
    try{
      hash.get(string[i]);
    }
    catch(e){
      hash.set(string[i], string[i]);
      result += string[i];
    }
  }
  console.log(result);
}

// duplicates('google all that you think can think of');

//5
function palindrome(string){
  const hash = new HashMap();
  for(let i = 0; i < string.length; i++){
    try{
      let check = hash.get(string[i]);
      hash.set(string[i], ++check);
    }
    catch(e){
      hash.set(string[i], 1);
    }
  }

  let odd = null;
  for(let i = 0; i < string.length; i++){
    const charCount = hash.get(string[i]);
    if(charCount % 2 === 1){
      if(odd === null || odd === string[i]){
        odd = string[i];
      }
      else{
        return false;
      }
    }    
  }
  return true;
}

// console.log(palindrome('north'));

//6
function anagrams(arr){
  let result = [];
  const subArr = new Map();

  arr.forEach(word => {
    const alphabetized = word.split('').sort().join('');
    let curr = subArr.get(alphabetized);
    if(curr === undefined){
      subArr.set(alphabetized, [word]);
    }
    else{
      const array = [...curr, word];
      subArr.set(alphabetized, array);
    }
  });
  for(let value of subArr.values()){
    result.push(value);
  }
  return result;
}

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));