const data = [ 35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576 ];

const example = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25 ];

const { getNextInvalidNumbers } = require('../src/day9-part1')

test('the first invalid nummber should be 107',() => {
  const result = getNextInvalidNumbers(25, [...example, 49, 35, 107])
  expect(result).toBe(107);
});
