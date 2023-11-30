const fs = require('fs');
// read input file
let file = fs.readFileSync('./input.txt', 'utf8');
let input = file.split('\n\n');

const board = input[0];
const instructions = input[1].split('\n');
const boardWidth = Math.ceil(input[0].split('\n')[0].length / 4);
const squares = board.match(/.{1,4}/g);
let stacksSilver = Array(boardWidth).fill('');
let stacksGold = Array(boardWidth).fill('');

// parse squares
for (let x = 0; x < squares.length - boardWidth; x++) {
  if (/[A-Z]/.test(squares[x])) {
    // get the position on the board, put it in the right stack
    stacksSilver[x % boardWidth] += squares[x][1];
    stacksGold[x % boardWidth] += squares[x][1];
  }
}

function topCrates(arr) {
  return arr.map((crate) => crate[0]).join('');
}

// Part 1
// parse instructions
instructions.forEach((todo) => {
  if (todo === '') return;
  const todoSplit = todo.split(' ');
  const steps = todoSplit[1];
  const from = todoSplit[3] - 1;
  const to = todoSplit[5] - 1;

  for (let i = 0; i < steps; i++) {
    const crate = stacksSilver[from].slice(0, 1);
    stacksSilver[from] = stacksSilver[from].slice(1);
    stacksSilver[to] = crate + stacksSilver[to];
  }
})

console.log("Cratemover 9000 top: " + topCrates(stacksSilver));

// Part 2
// parse instructions
instructions.forEach((todo) => {
  if (todo === '') return;
  const todoSplit = todo.split(' ');
  const steps = todoSplit[1];
  const from = todoSplit[3] - 1;
  const to = todoSplit[5] - 1;

  const crates = stacksGold[from].slice(0, steps);
  stacksGold[from] = stacksGold[from].slice(steps);
  stacksGold[to] = crates + stacksGold[to];
})

console.log("Cratemover 9001 top: " + topCrates(stacksGold));
