const fs = require('fs');
// read input file
const file = fs.readFileSync('./testInput.txt', 'utf8');
const input = file.split('\n');

let lines = [];

input.forEach((line) => {
  lines.push(line.split(' -> '));
});

// get size of grid
let minWidth = Infinity;
let maxWidth = 0;
let height = 0;

lines.forEach((line) => {
  line.forEach((coords) => {
    let pos = coords.split(',');
    if (pos[0] < minWidth) {
      minWidth = pos[0];
    }
    if (pos[0] > maxWidth) {
      maxWidth = pos[0];
    }
    if (parseInt(pos[1]) > height) {
      height = pos[1];
    }
  })
})

const width = maxWidth - minWidth + 1;
const source = (500 - minWidth);

// create empty grid
let grid = Array.from({length: height}, () => Array.from({length: width}, () => '.'));

grid[0][source] = '+';

// draw each line onto the grid
function drawLine(start, end) {
  if (start[0] === end[0]) {
    if (start[1] > end[1]) {
      let temp = start;
      start = end;
      end = temp;
    }
    for (let i = start[1]; i <= end[1]; i++) {
      grid[i-1][start[0]] = '#';
    }
  } else {
    if (start[0] > end[0]) {
      let temp = start;
      start = end;
      end = temp;
    }
    for (let i = start[0]; i <= end[0]; i++) {
      grid[start[1]-1][i] = '#';
    }
  }
}

lines.forEach((line) => {
  for(let i=0; i<line.length-1; i++) {
    let start = line[i].split(',');
    start[0] = start[0] - minWidth;
    let end = line[i+1].split(',');
    end[0] = end[0] - minWidth;
    drawLine(start, end);
  }
})

// add a grain of sand
function addSand() {
  const origin = [0, source];
  let current = origin;
  let down = [current[0]+1, current[1]];
  console.log(down);
}
addSand();

// print grid for debug
function printGrid() {
  for (let i = 0; i < height; i++) {
    console.log(grid[i].join(''));
  }
}
printGrid();
