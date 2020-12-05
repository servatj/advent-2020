const appRoot = require('app-root-path');
const fs = require("fs");
const readline = require("readline");

let lines = []
let linesRaw = []

const streamFile = fs.createReadStream(
  appRoot + '/data/grid3'
);

const lineReader = readline.createInterface({
  input: streamFile,
});

lineReader.on("line", async (line) => {
  try {
    linesRaw = [...lines, line]
    lines = [...lines, line.split('')]
  } catch(err) {
    console.log(err);
  }
});

lineReader.on("close", async () => {

  const treeCounter = (right, down) => {
    let posX = 0;
    let posY = 0;
    let endRow = 30;
    let countTree = 0;
  
    const checkPosition = (x, y) => {
      return lines[y][x] === '#' 
    }
  
    const move = () => {
      posX = posX + right;
      posY = posY + down;
      if(posX > 30) {
        posX = (posX - endRow) - 1
      }
      if(checkPosition(posX, posY)) {
        countTree++;
      } 
    }
    let counter = 0;
  
    while(counter < lines.length -1) {
      move();
      counter = counter + down
    }
  
    return countTree;
  }
  
  const slopes = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
  ]
  console.log(slopes.map( x => { return treeCounter(x[0], x[1]) }).reduce((a, b) => a * b)) //.)

});
