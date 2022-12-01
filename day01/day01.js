var fs = require('fs');
let input;

// read input file
try {
    var data = fs.readFileSync('./input.txt', 'utf8');
    input = data.toString();
} catch(e) {
    console.log(err);
}

input = input.split('\n');
let sums = [0];
let index = 0;

// loop through input, add number to sum except when a space is found, then start a new sum
input.forEach((item) => {
  if (item) {
    sums[index] += parseInt(item);
  } else {
    index++;
    sums[index] = 0;
  }
})

// Part 1
// find highest sum
console.log("Highest sum: " + Math.max(...sums));

// Part 2
// sort sums array
let sortedSums = sums.sort((a, b) => {
  return a - b;
});
// sort from greatest to least
sortedSums = sortedSums.reverse();
const topThree = sortedSums[0] + sortedSums[1] + sortedSums[2];
console.log("Top three sum: " + topThree);
