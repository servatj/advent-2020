const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/day9.txt';
const day9 = fs.readFileSync(filename, 'utf-8');

const adventData = day9.split('\n').map(Number);

//console.log(adventData)


const data = [ 35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576 ];
const data2 = [ 35, 20, 15, 25, 47, 40, 87, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576, 1320 ];


const example = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25 ];

const { getNextInvalidNumbers, findConsecutive } = require('../src/day9-part2')


test('test find consecutive',() => {
  const result = getNextInvalidNumbers(5, data)
  expect(result).toBe(62);
});

test.only('the first invalid nummber should be 127',() => {
  const result = findConsecutive(127, data)
  expect(result).toEqual([15, 25, 47, 40]);
  const result2 = findConsecutive(87, data2)
  expect(result2).toEqual([15, 25, 47]);
});


test('the first invalid nummber should be ?',() => {
  const result = getNextInvalidNumbers(25, adventData)
  console.log(result)
});
