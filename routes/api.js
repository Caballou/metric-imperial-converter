'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)

    if (initNum && initUnit) {
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      let fullUnit = convertHandler.spellOutUnit(initUnit)
      let returnNum = convertHandler.convert(initNum, initUnit).toFixed(5)
      let finalString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      /*console.log(initUnit)
      console.log(returnUnit)
      console.log(fullUnit)
      console.log(returnNum)
      console.log(finalString)*/
      
      res.json({ initNum: parseFloat(initNum), initUnit, returnNum: parseFloat(returnNum), returnUnit, string: finalString})
    } else if (!initNum && initUnit) {
      res.json('invalid number')
    } else if (initNum && !initUnit) {
      res.json('invalid unit')
    } else {
      res.json('invalid number and unit')
    }
  })

};
