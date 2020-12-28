const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/assemblyData.txt';
const instructions = fs.readFileSync(filename, 'utf-8');


const instArray = instructions.split('\n');

let keepRunning = true;

let acc = 0;
let processedInst = [];
let pointer = 0;
let currentInstruction = '';

const isSecondTime = (processed, value) => {
  return processed.filter(x => x === value).length > 1;
}

const instructionOps = (command, value) => {
  const ops =  {
    acc: () => {
      acc = acc + Number(value.replace('+', ''));
      pointer = pointer + 1;
    },
    jmp: () => {
      pointer = pointer  + (Number(value.replace('+', '')) );

    },
    nop: () => {
      pointer = pointer +1;
    },
    default: () => console.log('instruction not found')
  }
  ops[command] ? ops[command]() : ops['default']();
}

while(keepRunning){
  currentInstruction = instArray[pointer];
  const [command, value] = currentInstruction.split(' ');
  if (!isSecondTime(processedInst, pointer)) {
    instructionOps(command, value);
    processedInst = [...processedInst, pointer];
  } else {
    keepRunning = false;
  }
}

console.log('acc', acc)
