const getNextInvalidNumbers = (preamble, data) => {
  //console.log(data)

  let increment = 0;

  const getSums = (increment = 0) => {
    const list = [];
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
    const numbers = getSums(increment).join();
    //console.log('preamble', b, preamble, data[b])
    //console.log(numbers.join())
    if(!numbers.includes(data[b])) {
      return data[b];
    }
    increment++;
  }
  return 0;
}

module.exports = {
  getNextInvalidNumbers
}
