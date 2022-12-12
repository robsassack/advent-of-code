const fs = require('fs');
const { PassThrough } = require('stream');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n');

let register = [1];
let cycle = 1;

input.forEach((cmd) => {
  cmd = cmd.split(' ');
  if (cmd[0] === 'noop') {
    register.push(register[cycle - 1]);
  } else if (cmd[0] === 'addx') {
    register.push(register[cycle - 1]);
    register.push(register[cycle - 1] + parseInt(cmd[1]));
    cycle++;
  }
  cycle++;
})

// Part 1
function getStrength(index) {
  return index * register[index-1];
}

let sum = 0;
sum += getStrength(20);
sum += getStrength(60);
sum += getStrength(100);
sum += getStrength(140);
sum += getStrength(180);
sum += getStrength(220);

console.log("Sum for 20th, 60th, 100th, 140th, 180th, and 220th signal strengths: " + sum);
