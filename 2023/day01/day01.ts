import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf8");
const input = file.split("\n");

const numberStrs: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;
let letterSum = 0;

function isNumber(input: string): boolean {
  return !isNaN(parseInt(input));
}

function findSubstringLocations(input: string, substring: string): number[] {
  const locations: number[] = [];
  let index = input.indexOf(substring);

  while (index >= 0) {
    locations.push(index);
    index = input.indexOf(substring, index + 1);
  }

  return locations;
}

function getNumber(input: string): number {
  if (!input) {
    return 0;
  }

  const numbers: number[] = [];
  let retNum: string = "";

  // loop through each char in input
  for (let i = 0; i < input.length; i++) {
    // if char is a number, add to numbers array
    if (isNumber(input[i])) {
      numbers.push(parseInt(input[i]));
    }
  }

  // take first and last number from array, add to string
  const firstNum = String(numbers[0]);
  const lastNum = String(numbers[numbers.length - 1]);
  retNum = firstNum + lastNum;

  if (numbers.length === 0) {
    return 0;
  }

  return Number(retNum);
}

// this is probably not optimal
function getStrNumber(input: string): number {
  if (!input) {
    return 0;
  }

  let retNum: string = "";
  let numIndexes: { [key: number]: number } = {};

  // find the indexes of each number in the input string
  for (let i = 0; i < input.length; i++) {
    if (isNumber(input[i])) {
      numIndexes[i] = Number(input[i]);
    }
  }

  // look for words in input string
  for (let word in numberStrs) {
    const locations = findSubstringLocations(input, word);

    // if word is found, add to numbers array
    if (locations.length > 0) {
      locations.forEach((location) => {
        numIndexes[location] = Number(numberStrs[word]);
      });
    }
  }

  // find the lowest and highest key in numIndexes
  const keys = Object.keys(numIndexes);
  const lowestKey = Number(keys[0]);
  const highestKey = Number(keys[keys.length - 1]);

  retNum += String(numIndexes[lowestKey]) + (numIndexes[highestKey]);
  return Number(retNum);
}

input.forEach((item) => {
  // get two-digit number from each line
  sum += getNumber(item);
  letterSum += getStrNumber(item);
});

console.log("Calibration values sum: " + sum);
console.log("Calibration values sum with spelled out numbers: " + letterSum);
