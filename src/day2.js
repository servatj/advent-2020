const appRoot = require('app-root-path');
const fs = require("fs");
const readline = require("readline");

let valids = 0;

const countTimes = (character, password) => {
  return password.split('').filter( x => x === character ).length
}

const extractInterval = (line) => {
  return line.split(' ')[0]
}

const extractLetter = (line) => {
  return line.split(' ')[1].replace(':', '');
}

const extractPassword = (line) => {
  return line.split(' ')[2]
}

const streamFile = fs.createReadStream(
  appRoot + '/data/passwords'
);

const lineReader = readline.createInterface({
  input: streamFile,
});

lineReader.on("line", async (line) => {

  try {
    const interval = extractInterval(line);
    const letter = extractLetter(line);
    const password = extractPassword(line);
  
    const times = countTimes(letter, password);
  
    const low = interval.split('-')[0];
    const high = interval.split('-')[1];
    console.log(line, interval, letter, password)
    if(times >= low && times <= high) {
      valids++
    }
    
  } catch (error) {
     console.log(error)
  }


  console.log(valids);
})
