const fs = require('fs');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n');

function calcDistance(x, y) {
  return Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));
}

let head = [0, 0];
let tails = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
let tailsVisited = [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]];
input.forEach((line) => {
  let motion = line.split(' ');
  let direction = motion[0];
  let distance = parseInt(motion[1]);
  for (let i=0; i<distance; i++) {
    // move head based on instruction given
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
    for (let i=0; i<tails.length; i++) {
      if (i === 0) {
        moveNode(head, tails[i]);
        tailsVisited[i].push([tails[i][0], tails[i][1]]);
      } else {
        moveNode(tails[i-1], tails[i]);
        tailsVisited[i].push([tails[i][0], tails[i][1]]);
      }
    }
  }
})

function moveNode(leader, follower) {
  let headToTail = calcDistance(leader, follower);
  if (headToTail >= 2) {
    // if head above tail
    if (leader[1] > follower[1] && leader[0] === follower[0]) {
      follower[1]++;
    }

    // if head below tail
    else if (leader[1] < follower[1] && leader[0] === follower[0]) {
      follower[1]--;
    }

    // if head to the right of tail
    else if (leader[0] > follower[0] && leader[1] === follower[1]) {
      follower[0]++;
    }

    // if head to the left of tail
    else if (leader[0] < follower[0] && leader[1] === follower[1]) {
      follower[0]--;
    } else {
      // if head is diagonal to tail
      if (leader[0] > follower[0] && leader[1] > follower[1]) {
        follower[0]++;
        follower[1]++;
      } else if (leader[0] > follower[0] && leader[1] < follower[1]) {
        follower[0]++;
        follower[1]--;
      } else if (leader[0] < follower[0] && leader[1] > follower[1]) {
        follower[0]--;
        follower[1]++;
      } else if (leader[0] < follower[0] && leader[1] < follower[1]) {
        follower[0]--;
        follower[1]--;
      }
    }
  }
}

// Part 1
function removeDuplicates(array) {
  return Array.from(new Set(array.map(JSON.stringify)), JSON.parse);
}
console.log("Rope tail visited spots: " + removeDuplicates(tailsVisited[0]).length);

// Part 2
console.log("9th knot visited spots: " + removeDuplicates(tailsVisited[8]).length);
