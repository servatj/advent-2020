const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/positions.txt';
const data = fs.readFileSync(filename, 'utf-8');
let positions = data.split('\n') // .filter( x=> x === 'FFFBBBFRRR')

// positions = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']

let result = 0;

let seats = []

positions.forEach( row => {
  //row = 'BFFFBBFRRR'
  const rowCommands = row.substring(0,7).split('');
  const colCommands = row.substring(7,10).split('');
  
  let currentRange = { rowI: 0, rowL: 127 };

  const move = (command) => {
    if (command === 'F') {
      currentRange.rowL = ((currentRange.rowI / 2 ) + ((currentRange.rowL + 1) / 2)) - 1
    }
  
    if (command === 'B') {
      currentRange.rowI = ((currentRange.rowI) + (currentRange.rowL - currentRange.rowI + 1) / 2)
    }    
  }

  let currentRangeCol = { rowI: 0, rowL: 7 };

  const moveCol = (command) => {
    if (command === 'L') {
      currentRangeCol.rowL = ((currentRangeCol.rowI / 2 ) + ((currentRangeCol.rowL + 1) / 2)) - 1
    }
  
    if (command === 'R') {
      currentRangeCol.rowI = ((currentRangeCol.rowI) + (currentRangeCol.rowL - currentRangeCol.rowI + 1) / 2)
    }    
  }


  const calc = (row, col) => (row * 8) + col

  rowCommands.forEach( x => {
    move(x)
  })

  colCommands.forEach( x => {
    moveCol(x)
  })

  seats.push(calc(currentRange.rowL, currentRangeCol.rowL))

  if (calc(currentRange.rowL, currentRangeCol.rowL) > result) {
    result = calc(currentRange.rowL, currentRangeCol.rowL);
    console.log(result, row)
  }

});

const numbers = []
for (let i = 0; i < 1000; i++) {
  numbers.push(i)
}


console.log(seats.filter( x => x != 1023).map( x=> Number(x)).sort((a, b) => Number(a) - Number(b) ))

numbers.forEach( x => {
  if(!seats.includes(x)) {
    console.log('yeah', x)
  }
})
