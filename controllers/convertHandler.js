function ConvertHandler() {
  
  this.getNum = function(input) {
    let numRegex = /[.\d\/]+/gm //Regex for digits and dots (more than 1 dot included)

    let number = input.match(numRegex) 
    
    if (number !== null) { //If number exist...
      number = number[0].split('/') //Split the match by '/' 
    } else {
      return 1 //else return 1 by defaul (no number input)
    }

    if (number.length > 2 || isNaN(number[0])) { /*Check if the result were splitted more than once and
    if the first element of the array splitted is a valid number*/
      return undefined
    } else if (number[1]) {
      return number[0]/number[1] //If the array only was splitted 1 time, then, the division is performed
    } else {
      return number[0] //If the array was not split, the first element (a valid number) is returned
    }

  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+/igm
    const unitArray = ['gal','l','mi','km','lbs','kg']

    let unit = '';

    if (unitRegex.test(input)) {
      unit = input.match(unitRegex)[0].toLowerCase()
    } else {
      return undefined
    }
    
   if (unitArray.indexOf(unit) !== -1) {
      if (unit == 'l') {
        return unit.toUpperCase()
      } else {
        return unit
      }
    } else {
      return undefined
    }
};
  
  this.getReturnUnit = function(initUnit) {

    switch (initUnit) {
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs'
      default:
        return undefined;
    }
  
  };

  this.spellOutUnit = function(initUnit) {
    
    switch (initUnit) {
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms'
      default:
        return 'N/A';
    }

  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
   
    switch (initUnit) {
      case 'gal':
        return initNum*galToL;
      case 'L':
        return initNum/galToL;
      case 'mi':
        return initNum*miToKm;
      case 'km':
        return initNum/miToKm;
      case 'lbs':
        return initNum*lbsToKg;
      case 'kg':
        return initNum/lbsToKg;
      default:
        return undefined;
    }

  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + this.spellOutUnit(initUnit) 
    + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit)
    
    return result;
  };
  
}

module.exports = ConvertHandler;
