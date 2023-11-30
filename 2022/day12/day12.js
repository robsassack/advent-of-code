const fs = require('fs');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n');

// split input into 2d array
const graph = input.map((line) => {
  return line.split('');
});

let start;
let end;

// set start and end positions
for (let i = 0; i < graph.length; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    if (graph[i][j] === 'S') {
      start = [i, j];
    } else if (graph[i][j] === 'E') {
      end = [i, j];
    }
  }
}

// get height of current letter
function height(letter) {
  if (letter === 'S') {
    return 0;
  } else if (letter === 'E') {
    return 25;
  } else {
    return letter.charCodeAt(0) - 97;
  }
}

// get neighbors of current position
function getNeighbors(x, y) {
  let rows = graph.length;
  let columns = graph[0].length;
  let directions = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  let valid = [];
  for (let i = 0; i < directions.length; i++) {
    const newX = directions[i][0];
    const newY = directions[i][1];
    // check if in bounds
    if (newX >= 0 && newX < rows && newY >= 0 && newY < columns) {
      // check if at most one higher
      if (height(graph[newX][newY]) <= height(graph[x][y]) + 1) {
        valid.push(directions[i]);
      }
    }
  };
  return valid;
}

// use bfs to find shortest path
function bfs(start, end) {
  let visited = graph.map((row) => row.map((item) => false));
  let queue = [];

  queue.push([start, 0]);
  while (queue.length > 0) {
    let current = queue.shift();
    let x = current[0][0];
    let y = current[0][1];
    let distance = current[1];
    if (x === end[0] && y === end[1]) {
      return distance;
    }
    if (!visited[x][y]) {
      visited[x][y] = true;
      let neighbors = getNeighbors(x, y);
      neighbors.forEach((item) => {
        queue.push([item, distance + 1]);
      });
    }
  }
  return -1;
}

// Part 1
console.log("Shortest path: " + bfs(start, end));

// Part 2
let startingSpots = [];
let startingLengths = [];
// get all spots that start with 'a'
for (let i = 0; i < graph.length; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    if (graph[i][j] === 'a') {
      startingSpots.push([i, j]);
    }
  }
}

// get shortest path for each starting spot
startingSpots.forEach((spot) => {
  let result = bfs(spot, end);
  if (result !== -1) {
    startingLengths.push(result);
  }
});

console.log("Shortest path from 'a' spots: " + startingLengths.sort()[0]);
