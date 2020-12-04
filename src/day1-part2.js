const appRoot = require('app-root-path');
const { count } = require('console');
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

lineReader.on("close", async () => {
  function threeSum(arr, sum) {
      for (let i = 0; i < arr.length - 2; i++) { 
          for (let j = i + 1; j < arr.length - 1; j++) { 
              for (let k = j + 1; k < arr.length; k++) { 
                  if (Number(arr[i]) + Number(arr[j]) + Number(arr[k]) == sum) { 
                      console.log("Triplet is " + arr[i] + ", " + arr[j] + ", " + arr[k]); 
                      console.log("result " + Number(arr[i]) * Number(arr[j]) * Number(arr[k]))
                      return true; 
                  } 
              } 
          } 
      } 
      return false; 
  } 

  console.log(threeSum(years, 2020));

  const [first, second, third] = years;
  console.log(first * second * third);

});
