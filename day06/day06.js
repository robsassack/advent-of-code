const fs = require("fs");
let file = fs.createReadStream("./input.txt", {
  encoding: "utf8",
  highWaterMark: 1,
});
let chars = "";
// buffer size can be changed. setting it to 4 produces the answer for part 1, 14 for part 2.
let buffer = 14;
let index = buffer;
file.on("data", (input) => {
  chars += input;
  if (chars.length < buffer) return;
  if (chars.length > buffer) {
    chars = chars.slice(1);
  }
  if (/(.).*\1/.test(chars)) {
    index++;
  } else {
    console.log("Start-of-packet marker detected at: " + index);
    file.close();
  }
});
