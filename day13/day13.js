const fs = require('fs');
const { PassThrough } = require('stream');
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
  let rightOrder = true;
  // console.log(`Compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
  // both are numbers
  if (typeof(a) === 'number' && typeof(b) === 'number') {
    if (a < b) {
      rightOrder = true;
      return rightOrder;
      // return 'smaller';
    } if (a > b) {
      rightOrder = false;
      return rightOrder;
      // return 'bigger';
    } else {
      // return 'equal';
    }
  // check if both are arrays
  } else if (Array.isArray(a) && Array.isArray(b)) {
    for (let i=0; i<a.length+1; i++) {
      let result = compare(a[i], b[i]);
      if (a[i] === undefined) {
        rightOrder = true;
        return rightOrder;
      }
      if (b[i] === undefined) {
        rightOrder = false;
        return rightOrder;
      } else if (result === true) {
        rightOrder = true;
        return rightOrder;
      } else if (result === false) {
        rightOrder = false;
        return rightOrder;
      }
    }
  // check if a is array and b is number
  } else if (Array.isArray(a) && typeof(b) === 'number') {
    return compare(a, [b]);
  // check if a is number and b is array
  } else if (typeof(a) === 'number' && Array.isArray(b)) {
    return compare([a], b);
  }
}

let sum = 0;
for (let i = 0; i < pairs.length; i++) {
  let answer = compare(pairs[i][0], pairs[i][1]);
  if (answer === true) {
    sum += i+1;
  }
}

console.log(sum);
