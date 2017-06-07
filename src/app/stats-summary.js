

let totalAmount = (bills) => bills.reduce((total, item) => {
    return total += item.amount;
}, 0);

let totalNumberOfBills = (bills) => bills.length;

module.exports = { totalAmount, totalNumberOfBills }