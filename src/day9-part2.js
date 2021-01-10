const findConsecutive = (N, data) => {
  let result = 0;
  let list = [];
  let pointer = 0;

  console.log(N)
  data.forEach((number, index) => {
    result = number;
    for(let i = pointer; i < data.length - pointer -1; i++) {
      result = result + Number(data[i + 1]);
      if(result == N) {
        return list = data.slice(pointer, i + pointer);
      }
    }
    pointer++;
  });
  return list;
}

const getNextInvalidNumbers = (preamble, data) => {
  let increment = 0;
  let currentRawList = [];



  const getSums = (increment = 0) => {
    const list = []
    const currentPreamble = data.slice(increment, preamble + increment)
    currentPreamble.forEach((current, index) => {
      const sums = currentPreamble.map((num)=> {
        if(num != current) {
          return current + num;
        }
      });
      list.push(sums.filter( x => x != undefined))
    });
    return list;
  }

  for(let b = preamble; b < data.length; b++) {
    const numbersArr = getSums(increment);
    const numbers = numbersArr.join();
    //console.log(numbers)
    if(!numbers.includes(data[b])) {
      console.log(data[b])
      currentRawList = findConsecutive(data[b], data);
      console.log(currentRawList)
      const min = Math.max(...currentRawList);
      const max = Math.min(...currentRawList);
      return min + max;
    }
    increment++;
  }
  return 0;
}

module.exports = {
  getNextInvalidNumbers,
  findConsecutive
}
