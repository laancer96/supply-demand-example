// Example function to provide a shipping date
function calculateShipping (date) {
  const daysToShip = 2
  let result = new Date(date)
  result.setDate(result.getDate() + daysToShip)

  return result.toISOString().split('T')[0];
}

module.exports = calculateShipping