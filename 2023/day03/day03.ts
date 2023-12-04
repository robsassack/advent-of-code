import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf8");
const map = file.split("\n").map((line) => line.split(""));

let partSum = 0;

function lookForSymbol(row: number, col: number) {
  // check if out of bounds
  if (row >= map.length || row < 0 || col >= map[row].length || col < 0) {
    return false;
  }

  // check if it is not a period and not a number
  if (map[row][col] !== "." && isNaN(parseInt(map[row][col]))) {
    return true;
  }
}

for (let row=0; row<map.length; row++) {
  for (let col=0; col<map[row].length; col++) {
    let number = '';
    // look for multidigit number
    while (!isNaN(parseInt(map[row][col]))) {
      number += map[row][col];
      col++;
    }
    // if number is not empty, look around each number for a symbol
    if (number) {
      col = col - number.length;
      for (let i=0; i<number.length; i++) {
        let found = false;
        if (lookForSymbol(row-1, col-1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row-1, col)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row-1, col+1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row, col-1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row, col+1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row+1, col-1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row+1, col)) {
          partSum += parseInt(number);
          found = true;
        }
        if (lookForSymbol(row+1, col+1)) {
          partSum += parseInt(number);
          found = true;
        }
        if (found) {
          col = col + (number.length - i);
          break;
        }
        col++;
      }
    }
  }
}

console.log("Sum of part numbers: " + partSum);