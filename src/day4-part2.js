const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/passports';
const data = fs.readFileSync(filename, 'utf-8');

const passports = data.split(/\n{2,}/g);
const validators = ['byr','iyr','eyr','hgt','hcl','ecl','pid']


const validations = {
  byr: (value) => {
    return Number(value) >= 1920 && Number(value) <= 2002
  },
  iyr: (value) => {
    return Number(value) >= 2010 && Number(value) <= 2020
  },
  eyr: (value) => {
    return Number(value) >= 2020 && Number(value) <= 2030
  }, 
  hgt: (value) => {
    const metric = value.replace(/[0-9]/g,'') 
    if (metric === 'cm') {
      const num = value.replace('cm', '')
      return Number(num) >= 150 && Number(num) <= 193
    }
    if (metric === 'in') {
      const num = value.replace('in', '')
      return Number(num) >= 59 && Number(num) <= 76
    }
    return false
  },  
  hcl: (value) => {
    return /#([a-f]|[0-9])+/.test(value.substring(0,7))
  },  
  ecl: (value) => {
    const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    return valid.includes(value)
  },  
  pid: (value) => {
    return  /^[\d]{9}$/.test(value)
  }
} 

let validPassports = 0;
passports.forEach( passport => {
  passport = passport.replace(/\n/g, ' ');
  let counter = 0;
  let data = passport.split(' ').map( x => x.split(':'))
  validators.forEach( validator => {
    if(passport.includes(`${validator}:`)) {
     let value = data.filter(x => x[0] === validator)[0][1]
     if(validations[validator](value)) {
       counter++;
     } 
    } 
  });
  if(counter === 7) {
      validPassports++
  }
});

console.log(validPassports)
