const fs = require('fs');
// read input file
let file = fs.readFileSync('./input.txt', 'utf8');
let input = file.split('\n');

function getPriority(char) {
  // regex test if lowercase
  if (/[a-z]/.test(char)) {
    return char.charCodeAt(0) - 96;
  // regex test if uppercase
  } else if (/[A-Z]/.test(char)) {
    return char.charCodeAt(0) - 38;
  } else {
    return 0;
  }
}

// Part 1
let sum = 0;
input.forEach((rucksack) => {
  // get middle of string
  let halfIndex = Math.floor(rucksack.length / 2);
  // split string into two halves
  let compartments = [rucksack.slice(0, halfIndex), rucksack.slice(halfIndex)];
  // split each half into an array of characters
  compartments[0] = compartments[0].split('');
  compartments[1] = compartments[1].split('');
  // find what character is in both strings
  let match = compartments[0].filter(element => compartments[1].includes(element));
  if (match.length === 0) {
    return false;
  }
  let priority = getPriority(match[0]);
  sum += priority;
});

console.log("Your sum for all rucksacks is: " + sum);

// Part 2
let newSum = 0;
// split input into groups of 3
let groups = [];
for (let i = 0; i < input.length; i += 3) {
  groups.push(input.slice(i, i + 3));
}
groups.forEach((group) => {
  // pass over if group is less than 3
  if (group.length < 3) {
    return false;
  }
  let groupSplit = [];
  // split each group into 3 arrays of characters
  group.forEach((rucksack) => {
    groupSplit.push(rucksack.split(''));
  });
  let match = groupSplit.reduce((a, b) => a.filter(c => b.includes(c)));
  if (match.length === 0) {
    return false;
  }
  let priority = getPriority(match[0]);
  newSum += priority;
});

console.log("Your new sum of priorities for item types is: " + newSum);
