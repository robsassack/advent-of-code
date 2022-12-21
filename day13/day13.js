const fs = require('fs');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n\n');

let pairs = [];
input.forEach((item) => {
  let pair = item.split('\n');
  pairs.push(pair);
});

// parse all pairs to be arrays
for (let i = 0; i < pairs.length; i++) {
  pairs[i][0] = JSON.parse(pairs[i][0]);
  pairs[i][1] = JSON.parse(pairs[i][1]);
}

function compare(a, b) {
  // console.log(`Compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
  // both are numbers
  if (typeof(a) === 'number' && typeof(b) === 'number') {
    if (a < b) {
      return true;
    } if (a > b) {
      return false;
    } else {
      return;
    }
  // both are arrays
  } else if (Array.isArray(a) && Array.isArray(b)) {
    let shorter = Math.min(a.length, b.length);
    for (let i=0; i < shorter; i++) {
      let result = compare(a[i], b[i]);
      if (result === true) {
        return true;
      } if (result === false) {
        return false;
      }
    }
    return (compare(a.length, b.length));
  // a is array and b is number
  } else if (Array.isArray(a) && typeof(b) === 'number') {
    return compare(a, [b]);
  // a is number and b is array
  } else if (typeof(a) === 'number' && Array.isArray(b)) {
    return compare([a], b);
  }
}

let sum = 0;
for (let i = 0; i < pairs.length; i++) {
  // console.log(`=== Pair ${i+1} ===`);
  let answer = compare(pairs[i][0], pairs[i][1]);
  // console.log(answer);
  if (answer === true) {
    sum += i+1;
  }
}

console.log("Sum of indicies of right order pairs: " + sum);
