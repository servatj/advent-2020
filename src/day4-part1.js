const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/passports';
const data = fs.readFileSync(filename, 'utf-8');

const passports = data.split(/\n{2,}/g);
const validators = ['byr:','iyr:','eyr:','hgt:','hcl:','ecl:','pid:']

let validPassports = 0;


passports.forEach( passport => {
  let counter = 0;
  validators.forEach( validator => {
    if(passport.includes(validator)) {
      counter++
    }
  });
  if(counter === 7) {
      validPassports++
  }
});

console.log(validPassports)
