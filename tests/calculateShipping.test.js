const calculateShipping = require('../src/calculateShipping.js')
const result = calculateShipping('2022-01-01')

test('result is in string format', () => {
  expect(typeof result).toBe('string')
})

test('result date is two days later', () => {
  expect(result).toBe('2022-01-03')
})