const fs = require('fs');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n').filter(x => x != '');
const grid = input.map(x => x.split(''));
let visible = input.map(x => x.split(''));

// loop through all spots on grid
for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
        // check if edge
        if (x == 0 || x == grid.length-1 || y == 0 || y == grid[x].length-1) {
          visible[x][y] = true;
        } else {
          // check if visible
          testVisible(x, y);
        }
    }
}

function testVisible(x, y) {
  let unit = grid[x][y];
  visible[x][y] = true;
  let xPlus = true;
  let xMinus = true;
  let yPlus = true;
  let yMinus = true;
  // console.log('x: ' + x + ', y: ' + y + ', unit: ' + unit)
  // check all spots in +x
  // process.stdout.write("+x: ");
  for (let i=x+1; i<grid.length; i++) {
    // process.stdout.write(grid[i][y] + ',');
    if (grid[i][y] >= unit) {
      xPlus = false;
    }
  }
  // check all spots in -x
  // process.stdout.write("\n-x: ");
  for (let i=x-1; i>=0; i--) {
    // process.stdout.write(grid[i][y] + ',');
    if (grid[i][y] >= unit) {
      xMinus = false;
    }
  }
  // check all spots in +y
  // process.stdout.write("\n+y: ");
  for (let i=y+1; i<grid[x].length; i++) {
    // process.stdout.write(grid[x][i] + ',');
    if (grid[x][i] >= unit) {
      yPlus = false;
    }
  }
  // check all spots in -y
  // process.stdout.write("\n-y: ");
  for (let i=y-1; i>=0; i--) {
    // process.stdout.write(grid[x][i] + ',');
    if (grid[x][i] >= unit) {
      yMinus = false;
    }
  }
  if (xPlus == false && xMinus == false && yPlus == false && yMinus == false) {
    visible[x][y] = false;
  }
  // console.log('\n' + xPlus + ', ' + xMinus + ', ' + yPlus + ', ' + yMinus)
  // console.log('\nvisible: ' + visible[x][y]);
  // console.log('\n---------------');
}

// console.log(grid);
// console.log(visible);

// Part 1
function visibleCount(grid) {
  let count = 0;
  // loop over visible grid to count visible spots
  for (let x=0; x<grid.length; x++) {
    for (let y=0; y<grid[x].length; y++) {
      if (grid[x][y] == true) {
        count++;
      }
    }
  }
  return count;
}

console.log("Visible trees: " + visibleCount(visible));
