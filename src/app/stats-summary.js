const HouseHolds = require('./mock-model');
let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

let totalAmount = (bills) => bills.map((item) => {
    let total = 0;
    return total += item.amount;
})

let totalNumberOfBills = () => lotsOfBills.length

module.exports = { totalAmount, totalNumberOfBills }