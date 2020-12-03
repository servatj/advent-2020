const appRoot = require('app-root-path');
const fs = require("fs");
const readline = require("readline");


const streamFile = fs.createReadStream(
  appRoot + '/data/passwords'
);

const lineReader = readline.createInterface({
  input: streamFile,
});

lineReader.on("line", async (data) => {
  
  console.log(data)

})
