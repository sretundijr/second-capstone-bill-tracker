

const totalAmount = bills => bills.reduce((total, item) => total += item.amount, 0);

const totalNumberOfBills = bills => bills.length;

module.exports = { totalAmount, totalNumberOfBills };
