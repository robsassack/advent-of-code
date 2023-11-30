const fs = require('fs');
// read input file
let file = fs.readFileSync('./input.txt', 'utf8');
let input = file.split('\n');

let total = 0;
let newTotal = 0;
input.forEach((game) => {
  let players = game.split(' ');
  if (game) {
    switch (players[0]) {
      case 'A':
        if (players[1] === 'X') {
          // player A picks rock, player B picks rock
          // 1 point for picking rock, 3 points for draw
          total += (1 + 3);
          // 0 points for needed loss, 3 points for picking scissors
          newTotal += (0 + 3);
        } else if (players[1] === 'Y') {
          // player A picks rock, player B picks paper
          // 2 points for picking paper, 6 points for win
          total += (2 + 6);
          // 1 point for needed tie, 1 point for picking rock
          newTotal += (3 + 1);
        } else if (players[1] === 'Z') {
          // player A picks rock, player B picks scissors
          // 3 points for picking scissors, 0 points for loss
          total += (3 + 0);
          // 6 points for needed win, 2 points for picking paper
          newTotal += (6 + 2);
        }
        break;
      case 'B':
        if (players[1] === 'X') {
          // player A picks paper, player B picks rock
          // 1 point for picking rock, 0 points for loss
          total += (1 + 0);
          // 0 points for needed loss, 1 point for picking rock
          newTotal += (0 + 1);
        } else if (players[1] === 'Y') {
          // player A picks paper, player B picks paper
          // 2 points for picking paper, 3 points for draw
          total += (2 + 3);
          // 3 points for needed tie, 2 points for picking paper
          newTotal += (3 + 2);
        } else if (players[1] === 'Z') {
          // player A picks paper, player B picks scissors
          // 3 points for picking scissors, 6 points for win
          total += (3 + 6);
          // 6 points for needed win, 3 points for picking scissors
          newTotal += (6 + 3);
        }
        break;
      case 'C':
        if (players[1] === 'X') {
          // player A picks scissors, player B picks rock
          // 1 point for picking rock, 6 points for win
          total += (1 + 6);
          // 0 points for needed loss, 2 points for picking paper
          newTotal += (0 + 2);
        } else if (players[1] === 'Y') {
          // player A picks scissors, player B picks paper
          // 2 points for picking paper, 0 points for loss
          total += (2 + 0);
          // 3 points for needed tie, 3 points for picking scissors
          newTotal += (3 + 3);
        } else if (players[1] === 'Z') {
          // player A picks scissors, player B picks scissors
          // 3 points for picking scissors, 3 points for draw
          total += (3 + 3);
          // 6 points for needed win, 1 point for picking rock
          newTotal += (6 + 1);
        }
        break;
      default:
        break;
    }
  }
});

// Part 1
console.log("Total points: " + total);

// Part 2
console.log("New total points: " + newTotal);
