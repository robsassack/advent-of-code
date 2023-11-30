const fs = require("fs");
// read input file
let input = fs.readFileSync("./input.txt", "utf8");

function scan(buffer) {
  let index = buffer;
  let chars = "";
  // loop through input file moving up to view every 4 chars
  for (let i = 0; i < input.length; i++) {
    chars += input[i];
    // fill string if not at the size of the buffer yet
    if (chars.length < buffer) continue;
    if (chars.length > buffer) {
      chars = chars.slice(1);
    }
    if (/(.).*\1/.test(chars)) {
      index++;
    } else {
      return index;
    }
  }
}

// Part 1
console.log("Start-of-packet marker (buffer 4): " + scan(4));

// Part 2
console.log("Start-of-packet marker (buffer 14): " + scan(14));
