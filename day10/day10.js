const fs = require('fs');
const { PassThrough } = require('stream');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n');

let register = [1];
let cycle = 1;
let crt = '';

function drawPixel() {
  let pos = cycle;
  if (pos % 40 === 0) {
    pos = 40;
  } else {
    pos = pos % 40;
  }
  // console.log(
  //   'cycle: ' + cycle + ' pos: ' + pos + ' register: ' + register[cycle]
  // )
  if ((pos) >= (register[cycle] - 1) &&
    (pos) <= (register[cycle] + 1)) {
    crt += '█';
    // console.log('drawing #');
  } else {
    crt += '.';
    // console.log('drawing .');
  }
  // console.log('--------------------');
}

input.forEach((cmd) => {
  cmd = cmd.split(' ');
  if (cmd[0] === 'noop') {
    register.push(register[cycle - 1]);
    drawPixel();
  } else if (cmd[0] === 'addx') {
    register.push(register[cycle - 1]);
    drawPixel();
    register.push(register[cycle - 1] + parseInt(cmd[1]));
    cycle++;
    drawPixel();
  }
  cycle++;
})

// Part 1
function getStrength(index) {
  return index * register[index-1];
}

let sum = 0;
sum += getStrength(20) + getStrength(60) + getStrength(100) + getStrength(140) + getStrength(180) + getStrength(220);

console.log("Sum for 20th, 60th, 100th, 140th, 180th, and 220th signal strengths: " + sum);

// Part 2
let lines = [];
for (let i = 0; i < crt.length; i += 40) {
  lines.push(crt.slice(i, i + 40));
}
console.log(lines.join('\n'));
