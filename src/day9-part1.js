

const getNextInvalidNumbers = (preamble, data) => {

  const list = [];

  for(let i = 0; i < preamble; i++) {
    const sums = data.slice(0,preamble).map(num => {
      if(num != data[i]) {
        return data[i] + num;
      }
    });
    list.push(sums.filter( x => x != undefined))
  }


  for(let b = preamble; b < data.length; b++) {
    if(!list.join().includes(data[b])) {
      return data[b];
    }
  }
  console.log(list.join().includes(27))


  return 0;
}

module.exports = {
  getNextInvalidNumbers
}
