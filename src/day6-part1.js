const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/questions';
const data = fs.readFileSync(filename, 'utf-8');

const groups = data.split(/\n{2,}/g);

let result = 0;

console.log(groups)

groups.forEach( row => {
  const line = [ ...new Set(row.replace(/\n/g, '').split(''))];
  result = result + line.length
});

console.log(result)
