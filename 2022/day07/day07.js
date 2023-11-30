const fs = require('fs');
// read input file
let file = fs.readFileSync('./input.txt', 'utf8');
let input = file.split('\n');

let currentPath = [];
let filesystem = {};

function changeDir(cmd) {
  let arg = cmd.substring(5);
  // start at root
  if (currentPath.length === 0) {
    filesystem = { directory: arg, files: [], subDirectories: [] };
    currentPath.push(arg);
  } else {
    if (arg === '..') {
      // move up in filesystem
      currentPath.pop();
    } else {
      // add new directory to filesystem
      currentPath.push(arg);
      // find new directory in filesystem and add new directory if needed
      let currentDir = filesystem;
      for (let i=1; i<currentPath.length; i++) {
        let dir = currentDir.subDirectories.find((dir) => dir.directory === currentPath[i]);
        if (dir) {
          currentDir = dir;
        } else {
          let newDir = { directory: currentPath[i], files: [], subDirectories: [] };
          currentDir.subDirectories.push(newDir);
          currentDir = newDir;
        }
      }
    }
  }
}

function addFiles(cmd) {
  let file = cmd.split(' ');
  if (currentPath.length === 1) {
    filesystem.files.push({ name: file[1], size: file[0] });
  } else {
    // find directory in filesystem and push file
    let currentDir = filesystem;
    for (let i = 1; i < currentPath.length; i++) {
      let dir = currentDir.subDirectories.find((dir) => dir.directory === currentPath[i]);
      if (dir) {
        currentDir = dir;
      }
    }
    currentDir.files.push({ name: file[1], size: file[0] });
  }
}

// handle commands
input.forEach((cmd) => {
  if (cmd.startsWith('$ cd')) {
    changeDir(cmd);
  } else if (cmd.match(/^\d/)) {
    // push files to current directory if in root
    addFiles(cmd);
  }
})

// find every directory and its file size, add to directoryList
let directoryList = [];
function findDirectories(dir) {
  let size = 0;
  dir.files.forEach((file) => {
    size += parseInt(file.size);
  });
  dir.subDirectories.forEach((subDir) => {
    size += findDirectories(subDir);
  });
  directoryList.push({ directory: dir.directory, size: size });
  return size;
}

findDirectories(filesystem);


// Part 1
let sum = 0;
directoryList.forEach((dir) => {
  if (dir.size <= 100000) {
    sum += dir.size;
  }
});
console.log("Sum of all directories less than 100K bytes: " + sum);

// Part 2
const rootSize = directoryList.find((dir) => dir.directory === filesystem.directory).size;
const updateSize = rootSize - 40000000;
let toDelete = directoryList.find((dir) => dir.size >= updateSize).size;
console.log("Smallest directory size for update: " + toDelete);
