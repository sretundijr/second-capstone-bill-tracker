
const moneyMath = require('money-math');

// there are some small rounding errors under certain scenarios that need to be solved but seems to work
// rounding errors occur at 3 roommates or most likely all odd numbers
// needs cleaning up 

// helper for divide bills between roommates
const sortBillsLargestToSmallest = (bills) => {
    return bills.sort((a, b) => {
        return parseFloat(b.amount) - parseFloat(a.amount);
    })
}

// helper for divide bills between roommates
const removeBillsOverCertainAmount = (bills, amount) => {
    let splitBills = [];
    bills.forEach((item) => {
        if (parseFloat(item.amount) >= parseFloat(amount)) {
            splitBills.push(item);
        }
    });
    return splitBills
}

// helper for divide bills between roommates
const removeBillsUnderCertainAmount = (bills, amount) => {
    let splitBills = [];
    bills.forEach((item) => {
        if (parseFloat(item.amount) < parseFloat(amount)) {
            splitBills.push(item);
        }
    });
    return splitBills
}

// helper for divide bills between roommates
let eachRoommateArrayEmpty = (numRoommates) => {
    let dividedBills = [];
    for (let i = 0; i < numRoommates; i++) {
        dividedBills.push([]);
    }
    return dividedBills;
};

// helper for divide bills between roommates
let distributeSmallBills = (smallBills, dividedBills, numberOfRoommates) => {

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

    let dividedLargeBills = eachRoommateArrayEmpty(numRoommates);

    let onlyLargeBills = removeBillsOverCertainAmount(bills, amount);

    const onlySmallBills = removeBillsUnderCertainAmount(bills, amount);

    onlyLargeBills.map((bill) => {
        dividedLargeBills.forEach((item) => {
            let roommateTotaldue = moneyMath.div(bill.amount, numRoommates)
            let shallowCopyWithExtraProp = Object.assign(bill, { roommateAmountDue: roommateTotaldue })
            item.push(JSON.parse(JSON.stringify(shallowCopyWithExtraProp)));
        })
    })
    const dividedBills = distributeSmallBills(onlySmallBills, dividedLargeBills, numRoommates);

    return dividedBills;
}

// helper used in equalize
const findCurrentTotalsForEachRoommate = (dividedBills) => {
    let roommateTotals = [];
    dividedBills.forEach((arr, index) => {
        let total = '0.00';
        arr.forEach((item) => {
            total = moneyMath.add(total, item.roommateAmountDue);
        });
        roommateTotals.push(total);
    });
    return roommateTotals
}

// helper for equalize
let billsTotalAmount = (bills) => {
    let overallTotal = '0.00';
    bills.forEach((item) => {
        overallTotal = moneyMath.add(overallTotal, item.amount);
    });
    return overallTotal;
};

// equalize the differential by adding and subtracting the difference from the largest bill
let equalizeBills = (dividedBills, bills, numberOfRoommates) => {
    const roommateTotals = findCurrentTotalsForEachRoommate(dividedBills)
    const totalAmount = billsTotalAmount(bills);
    const evenlyDivided = moneyMath.div(totalAmount, numberOfRoommates);

    roommateTotals.map((item, index) => {
        let overage = '0.00';
        let amountDue = '0.00';
        if (item > evenlyDivided) {
            overage = moneyMath.subtract(item, evenlyDivided);
            dividedBills[index][0].roommateAmountDue = moneyMath.subtract(dividedBills[index][0].roommateAmountDue, overage)
        }
        if (item < evenlyDivided) {
            let shortage = moneyMath.subtract(evenlyDivided, item);
            dividedBills[index][0].roommateAmountDue = moneyMath.add(dividedBills[index][0].roommateAmountDue, shortage)
        }
    })
    return dividedBills;
};

// composes the total functionality
const billingSummary = (bills, amount, numberOfRoommates) => {
    let dividedExpenses = divideBillsBetweenRoommates(bills, amount, numberOfRoommates);
    const finalBillingAmount = equalizeBills(dividedExpenses, bills, numberOfRoommates);
    return finalBillingAmount;
}

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

    billingSummary
}

