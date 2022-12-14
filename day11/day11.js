const fs = require('fs');
// read input file
const file = fs.readFileSync('./input.txt', 'utf8');
const input = file.split('\n\n');

let monkeys = [];
input.forEach((monkey) => {
  let info = monkey.split('\n');
  // get starting items
  let starting = info[1].split(':')[1].split(',');
  let items = [];
  starting.forEach((item) => {
    items.push(Number(item));
  })
  // get operation
  let operation = info[2].split('=')[1].slice(1);
  // get test
  let test = info[3].split(' ')[5];
  // get true
  let trueValue = info[4].split(' ')[9];
  // get false
  let falseValue = info[5].split(' ')[9];
  monkeys.push({
    items: items,
    operation: operation,
    test: Number(test),
    true: Number(trueValue),
    false: Number(falseValue),
    inspects: 0
  });
})

// play rounds
for (let x=0; x<20; x++) {
  for (let y=0; y<monkeys.length; y++) {
    // console.log(`Monkey ${y}:`);
    for (let z=0; z<monkeys[y].items.length; z++) {
      // console.log(`  Monkey inspects an item with a worry level of ${monkeys[y].items[z]}.`);
      monkeys[y].inspects++;
      let op = monkeys[y].operation.split(' ');
      let num1 = op[0];
      let operand = op[1];
      let num2 = op[2];
      let newItem = 0;
      if (num1 === 'old') {
        num1 = monkeys[y].items[z];
      } else {
        num1 = Number(num1);
      }
      if (num2 === 'old') {
        num2 = monkeys[y].items[z];
      } else {
        num2 = Number(num2);
      }
      if (operand === '+') {
        newItem = num1 + num2;
      } else if (operand === '*') {
        newItem = num1 * num2;
      }
      // console.log(`    Monkey ${operand}s the worry levels of the two items, resulting in a worry level of ${newItem}.`);
      newItem = Math.floor(newItem / 3);
      // console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${newItem}.`);
      if (newItem % monkeys[y].test === 0) {
        // console.log(`    Current worry level is divisible by ${monkeys[y].test}.`);
        // console.log(`    Item with worry level ${newItem} is thrown to monkey ${monkeys[y].true}.`);
        monkeys[monkeys[y].true].items.push(newItem);
      } else {
        // console.log(`    Current worry level is not divisible by ${monkeys[y].test}.`);
        // console.log(`    Item with worry level ${newItem} is thrown to monkey ${monkeys[y].false}.`);
        monkeys[monkeys[y].false].items.push(newItem);
      }
    }
    // remove items from current monkey
    monkeys[y].items = [];
  }
}

// console.log(monkeys);

// Part 1
let inspections = [];
monkeys.forEach((monkey) => {
  inspections.push(monkey.inspects);
});

inspections.sort((b, a) => a - b);

console.log('Monkey business: ' + (inspections[0] * inspections[1]));
