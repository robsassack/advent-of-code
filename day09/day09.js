const fs = require('fs');
// read input file
const file = fs.readFileSync('./testInput2.txt', 'utf8');
const input = file.split('\n');

function calcDistance(x, y) {
  return Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));
}

let headVisited = [[0, 0]];
let tailVisited = [[0, 0]];
let head = [0, 0];
let tail = [0, 0];
input.forEach((line) => {
  let motion = line.split(' ');
  let direction = motion[0];
  let distance = parseInt(motion[1]);
  for (let i=0; i<distance; i++) {
    headVisited.push([head[0], head[1]]);
    switch (direction) {
      case 'U':
        head[1]++;
        break;
      case 'D':
        head[1]--;
        break;
      case 'L':
        head[0]--;
        break;
      case 'R':
        head[0]++;
        break;
    }
    let headToTail = calcDistance(head, tail);
    // if head is far away from tail, move tail closer to head
    if (headToTail >= 2) {
      // move to one position behind head
      tail = headVisited[headVisited.length - 1];
      tailVisited.push([tail[0], tail[1]]);
    }
  }
})

// Part 1
function removeDuplicates(array) {
  return Array.from(new Set(array.map(JSON.stringify)), JSON.parse);
}

console.log("Rope tail visited spots: " + removeDuplicates(tailVisited).length);
