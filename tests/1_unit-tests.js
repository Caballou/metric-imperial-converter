const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', () => {
    
    test('Whole number input', (done) => {
      let input = '155km';
      assert.equal(convertHandler.getNum(input), 155)
      done()
    })

    test('Decimal number input', (done) => {
      let input = '0.5mi';
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })

    test('Fraction input', (done) => {
      let input = '1/3gal';
      assert.equal(convertHandler.getNum(input), 1/3)
      done() 
    })

    test('Fraction input with decimal', (done) => {
      let input = '2.5/2km';
      assert.equal(convertHandler.getNum(input), 2.5/2)
      done()
    })

    test('Error on double-fraction', (done) => {
      let input = '3/2/5L';
      assert.equal(convertHandler.getNum(input), undefined)
      done()
    })

    test('No numerical input (Default = 1)', (done) => {
      let input = '';
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  
  })

  suite('Function convertHandler.getUnit(input)', () => {

    test('For each valid input unit', (done) => {
      let input = ['gal','l','mi','km','lbs','kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
      let output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg']
      
      input.forEach((element, index) => {
        assert.equal(convertHandler.getUnit(element), output[index])
      })
      done()
    })

    test('Error for an invalid input unit', (done) => {
      let input = '3ASD'
      assert.equal(convertHandler.getUnit(input), undefined)
      done()
    })

  })

  suite('Function convertHandler.getReturnUnit(initUnit)', () => {

    test('Return the correct unit for each valid input unit', (done) => {
      let initUnit = ['gal','L','mi','km','lbs','kg']
      let output = ['L','gal','km','mi','kg','lbs']

      initUnit.forEach((element, index) => {
        assert.equal(convertHandler.getReturnUnit(element), output[index])
      })
      done()
    })

  })

  suite('Function convertHandler.spellOutUnit(initUnit)', () => {

    test('Spelled-out string unit for each valid input', (done) => {
      let initUnit = ['gal','L','mi','km','lbs','kg']
      let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']

      initUnit.forEach((element, index) => {
        assert.equal(convertHandler.spellOutUnit(element), output[index])
      })
      done()

    })
  })

  suite('Function convertHandler.convert(initNum, initUnit)', () => {

    test('Convert gal to L', (done) => {
      let [initNum, initUnit] = [1, 'gal']
      let output = 3.7854
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.001)
      done()
    })

    test('Convert L to gal', (done) => {
      let [initNum, initUnit] = [3, 'L'] 
      let output = 0.7925
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.001)
      done()
    })

    test('Convert mi to km', (done) => {
      let [initNum, initUnit] = [2.5, 'mi']
      let output = 4.0233
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.001)
      done()
    })

    test('Convert km to mi', (done) => {
      let [initNum, initUnit] = [0.33, 'km']
      let output = 0.2050
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.001)
      done()
    })

    test('Convert lbs to kg', (done) => {
      let [initNum, initUnit] = [200, 'lbs']
      let output = 90.7185
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.01)
      done()
    })

    test('Convert kg to lbs', (done) => {
      let [initNum, initUnit] = [43.55, 'kg']
      let output = 96.0113
      assert.approximately(convertHandler.convert(initNum, initUnit), output, 0.01)
      done()
    })

  })
  
});