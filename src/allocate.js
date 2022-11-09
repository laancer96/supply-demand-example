function allocate (salesOrders, purchaseOrders) {
  salesOrders.sort(saleOrderComparator)
  purchaseOrders.sort(purchaseOrderComparator)

  const calculateShipping = require('./calculateShipping')

  let stock = 0
  let result = []

  try {
    // complete as many sale orders as posible with current stock
    while (salesOrders.length && stock >= salesOrders[0].quantity) {
      const saleOrder = salesOrders.shift()
      stock -= saleOrder.quantity

      result.push({
        id: saleOrder.id,
        arriving: calculateShipping(saleOrder.created)
      })
    }

    // wait for purchase orders while the needed stock is gathered
    while (salesOrders.length && purchaseOrders.length) {
      const purschaseOrder = purchaseOrders.shift()
      stock += purschaseOrder.quantity
      
        // complete as many sale orders as possible with the new stock
        while (salesOrders.length && stock >= salesOrders[0].quantity) {
          result.push({
            id: salesOrders[0].id,
            arriving: calculateShipping(purschaseOrder.receiving)
          })

          // Remove the sale quantity from the stock and remove the completed saled from saleOrders
          stock -= salesOrders[0].quantity
          salesOrders.shift()
        }
    }

    // Finally set the arriving date to TBD for remaining sale orders
    salesOrders.forEach((saleOrder) => {
      result.push({
        id: saleOrder.id,
        arriving: 'TBD',
      })
    })
  } catch (error) {
    console.log(error)
    // handle the error in some other way
  }

  return result
}

function saleOrderComparator (a, b) {
  return a.created > b.created ? 1 : -1
}

function purchaseOrderComparator (a, b) {
  return a.receiving > b.receiving ? 1 : -1
}

module.exports = allocate