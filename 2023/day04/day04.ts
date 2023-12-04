import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf8");
const input = file.split("\n");

let points = 0;

input.forEach((line) => {
  if (line === "") {
    return;
  }
  let card = line.split(/:\s+/);
  // remove card number
  card.shift();
  // remove separator
  card = card.join("").split(/\s\|\s+/);
  let cardNumbers = card[0].split(/\s+/);
  let winningNumbers = card[1].split(/\s+/);

  // find overlapping numbers
  let overlappingNumbers = cardNumbers.filter((number) =>
    winningNumbers.includes(number)
  );

  let currentPoints = 0;
  // add points
  for (let i=0; i<overlappingNumbers.length; i++) {
    if (currentPoints === 0) {
      currentPoints = 1;
    } else {
      currentPoints = currentPoints * 2;
    }
  }
  points = points + currentPoints;
});

console.log("Total points: " + points);