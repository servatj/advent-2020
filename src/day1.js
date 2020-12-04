const appRoot = require('app-root-path');
const fs = require("fs");
const readline = require("readline");

let years = []

const streamFile = fs.createReadStream(
  appRoot + '/data/day1.txt'
);

const lineReader = readline.createInterface({
  input: streamFile,
});

lineReader.on("line", async (line) => {
  years = [...years, line]
});

lineReader.on("close", async (line) => {
  years.forEach((value, index) => {
    for(let i = index ; i <= years.length; i ++) {
       if(Number(value) + Number(years[i]) === 2020) {
         console.log(value * years[i])
       }
    }
  })
});
