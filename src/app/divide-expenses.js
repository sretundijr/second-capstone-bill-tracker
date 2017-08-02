
const moneyMath = require('money-math');

// there are some small rounding errors under certain scenarios that need to
// be solved but seems to work
// rounding errors occur at 3 roommates or most likely all odd numbers
// needs cleaning up

// helper for divide bills between roommates
const sortBillsLargestToSmallest = bills => bills.sort((a, b) =>
  parseFloat(b.amount) - parseFloat(a.amount));

const filterBillsArray = (bills, callback) => bills.filter(callback);

// helper for divide bills between roommates
const removeBillsOverCertainAmount = (bills, amount) => {
  const overAmount = item => parseFloat(item.amount) >= parseFloat(amount);
  return filterBillsArray(bills, overAmount);
};

// helper for divide bills between roommates
const removeBillsUnderCertainAmount = (bills, amount) => {
  const underAmount = item => parseFloat(item.amount) < parseFloat(amount);
  return filterBillsArray(bills, underAmount);
};

// helper for divide bills between roommates
const eachRoommateArrayEmpty = (numRoommates) => {
  const dividedBills = [];
  for (let i = 0; i < numRoommates; i++) {
    dividedBills.push([]);
  }
  return dividedBills;
};

// helper for divide bills between roommates
const distributeSmallBills = (smallBills, dividedBills, numberOfRoommates) => {
  let dividedBillsIndex = 0;
  let reverseDirection = numberOfRoommates - 1;
  smallBills.forEach((item) => {
    if (dividedBillsIndex < numberOfRoommates) {
      item.roommateAmountDue = item.amount;
      dividedBills[dividedBillsIndex].push(item);
      dividedBillsIndex++;
    } else {
      item.roommateAmountDue = item.amount;
      dividedBills[reverseDirection].push(item);
      reverseDirection--;
      if (reverseDirection < 0) {
        dividedBillsIndex = 0;
        reverseDirection = numberOfRoommates - 1;
      }
    }
  });

  return dividedBills;
};

// used to compose the final summary
const divideBillsBetweenRoommates = (bills, amount, numRoommates) => {
  bills = sortBillsLargestToSmallest(bills);

  const dividedLargeBills = eachRoommateArrayEmpty(numRoommates);

  const onlyLargeBills = removeBillsOverCertainAmount(bills, amount);

  const onlySmallBills = removeBillsUnderCertainAmount(bills, amount);

  onlyLargeBills.map((bill) => {
    dividedLargeBills.forEach((item) => {
      const roommateTotaldue = moneyMath.div(bill.amount, numRoommates);
      const shallowCopyWithExtraProp = Object.assign(bill, { roommateAmountDue: roommateTotaldue });
      item.push(JSON.parse(JSON.stringify(shallowCopyWithExtraProp)));
    });
  });
  const dividedBills = distributeSmallBills(onlySmallBills, dividedLargeBills, numRoommates);

  return dividedBills;
};

// helper used in equalize
const findCurrentTotalsForEachRoommate = (dividedBills) => {
  const roommateTotals = [];
  dividedBills.forEach((arr) => {
    let total = '0.00';
    arr.forEach((item) => {
      total = moneyMath.add(total, item.roommateAmountDue);
    });
    roommateTotals.push(total);
  });
  return roommateTotals;
};

// helper for equalize
const billsTotalAmount = (bills) => {
  let overallTotal = '0.00';
  bills.forEach((item) => {
    overallTotal = moneyMath.add(overallTotal, item.amount);
  });
  return overallTotal;
};

// equalize the differential by adding and subtracting the difference from the largest bill
const equalizeBills = (dividedBills, bills, numberOfRoommates) => {
  const roommateTotals = findCurrentTotalsForEachRoommate(dividedBills);
  const totalAmount = billsTotalAmount(bills);
  const evenlyDivided = moneyMath.div(totalAmount, numberOfRoommates);

  roommateTotals.map((item, index) => {
    let overage = '0.00';
    if (item > evenlyDivided) {
      overage = moneyMath.subtract(item, evenlyDivided);
      dividedBills[index][0]
        .roommateAmountDue = moneyMath.subtract(dividedBills[index][0].roommateAmountDue, overage);
    }
    if (item < evenlyDivided) {
      const shortage = moneyMath.subtract(evenlyDivided, item);
      dividedBills[index][0]
        .roommateAmountDue = moneyMath.add(dividedBills[index][0].roommateAmountDue, shortage);
    }
  });
  return dividedBills;
};

// composes the total functionality
const billingSummary = (bills, amount, numberOfRoommates) => {
  const newBills = bills.slice(0);
  const dividedExpenses = divideBillsBetweenRoommates(newBills, amount, numberOfRoommates);
  const finalBillingAmount = equalizeBills(dividedExpenses, newBills, numberOfRoommates);
  return finalBillingAmount;
};

module.exports = {
  sortBillsLargestToSmallest,
  removeBillsOverCertainAmount,
  removeBillsUnderCertainAmount,
  eachRoommateArrayEmpty,
  distributeSmallBills,
  divideBillsBetweenRoommates,
  findCurrentTotalsForEachRoommate,
  billsTotalAmount,
  equalizeBills,
  billingSummary,
};

