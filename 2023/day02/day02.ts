import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf8");
const input = file.split("\n");

let sum = 0;
let gameId = 1;
let powerSum = 0;

function isRoundPossible(round: string) {
  let isPossible = true;
  const colors = round.split(", ");

  colors.forEach((color) => {
    const [amount, colorName] = color.split(" ");
    if (colorName === 'red') {
      if (Number(amount) > 12) {
        isPossible = false;
        return;
      }
    } else if (colorName === 'green') {
      if (Number(amount) > 13) {
        isPossible = false;
        return;
      }
    } else if (colorName === 'blue') {
      if (Number(amount) > 14) {
        isPossible = false;
        return;
      }
    }
  });

  return isPossible;
}

function isGamePossible(line: string) {
  let isPossible = true;
  const [, game] = line.split(": ");
  const rounds = game.split("; ");

  rounds.forEach((round) => {
    if (!isRoundPossible(round)) {
      isPossible = false;
      return;
    }
  });

  return isPossible;
}

function getGamePower(line: string) {
  let power = 0;
  let blueMax = 0;
  let greenMax = 0;
  let redMax = 0;

  const [, game] = line.split(": ");
  const rounds = game.split("; ").join(", ").split(", ");

  rounds.forEach((round) => {
    const [amount, colorName] = round.split(" ");
    if (colorName === 'red') {
      if (Number(amount) > redMax) {
        redMax = Number(amount);
      }
    } else if (colorName === 'green') {
      if (Number(amount) > greenMax) {
        greenMax = Number(amount);
      }
    } else if (colorName === 'blue') {
      if (Number(amount) > blueMax) {
        blueMax = Number(amount);
      }
    }
  });

  power = redMax * greenMax * blueMax;

  return power;
}

input.forEach((line) => {
  if (line === "") return;

  if (isGamePossible(line)) {
    sum += gameId;
  }

  powerSum += getGamePower(line);

  gameId++;
});

console.log("Sum of valid games: " + sum);
console.log("Power sum of games: " + powerSum)
