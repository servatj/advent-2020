const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/questions';
const data = fs.readFileSync(filename, 'utf-8');

const groups = data.split(/\n{2,}/g);

let totalCount = 0;

groups.forEach( row => {
  const uniques =  row.split(/\n/g).join('').split('\n').map( x => [... new Set(x.split(''))].join(''));
  const sortedLines = row.split(/\n/g);

  uniques.forEach( (answer) => {
    for (let i = 0; i < answer.length; i++) {
      let innerCount = 0;
      for (let b = 0; b < sortedLines.length; b++) {
        if(sortedLines[b].includes(answer[i])) {
          innerCount++
        }
      }
      if (innerCount === sortedLines.length) {
        totalCount++
      }
    }
  });
});

console.log(totalCount)
