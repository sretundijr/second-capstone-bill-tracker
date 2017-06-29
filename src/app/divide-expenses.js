// install npm packages

var moneyMath = require('money-math');
var lodashPullall = require('lodash.pullall');

// there are some small rounding errors under certain scenarios that need to be solved but seems to work
// rounding errors occur at 3 roommates or most likely all odd numbers
// needs cleaning up 

let bills = () => { return [110.00, 2000.00, 350.00, 60.00, 75.00, 1220.00, 200.00, 50.00, 73.00, 82.00, 190.00, 90.00]; };
// let bills = () => {return [1000, 180, 200, 50, 40];};

let billsTotalAmount = () => {
    let overallTotal = "0";
    let totalAmountDue = bills().forEach((item) => {

        overallTotal = moneyMath.add(overallTotal, item.toString());

    });
    overallTotal *= 100;
    return overallTotal;
};

// ************************************
// adjust the amount of roommates here 
// *************************************
let numberOfRoommates = 4;

//overall total before any divisions are made
let totalAmountDuePerRoommate = (bills) => {
    let total = 0;
    bills.forEach((item) => {
        total += item;
    });
    return total / numberOfRoommates;
};

// build an array of bills that have an amount less then 300 from largest to smallest this occurs after the lodashPullall
// this also sorts the bills array from smallest to largests
let smallBills = bills().sort((a, b) => {
    return b - a;
});

// build an array that contains all bills greater then 300
let splitBills = [];
bills().forEach((item) => {
    if (item >= 300) {
        splitBills.push(item);
    }
});

// remove bills that are to be split into its own array
lodashPullall(smallBills, splitBills);

// builds an array with an array at each index to represent the number of roommates
let eachRoommateArray = (numRoommates) => {
    let dividedBills = [];
    for (let i = 0; i < numRoommates; i++) {
        dividedBills.push([]);
    }
    return dividedBills;
};

// build the array representing the number of roommates
let dividedBills = eachRoommateArray(numberOfRoommates);

// divides the large bills by the number of roommates and push to each array index representing
// the roommate
splitBills.map((bill) => {
    dividedBills.forEach((item) => {
        item.push(moneyMath.div(bill.toString(), numberOfRoommates.toString()));
    });
});

// distribute the small bills array to each roommate
let distributeSmallBills = (smallBills) => {

    let dividedBillsIndex = 0;
    let reverseDirection = numberOfRoommates - 1;
    smallBills.forEach((item) => {
        if (dividedBillsIndex < numberOfRoommates) {
            dividedBills[dividedBillsIndex].push(moneyMath.floatToAmount(item));
            dividedBillsIndex++;
        } else {
            dividedBills[reverseDirection].push(moneyMath.floatToAmount(item));
            reverseDirection--;
            if (reverseDirection < 0) {
                dividedBillsIndex = 0;
                reverseDirection = numberOfRoommates - 1;
            }
        }
    });
    return dividedBills;
};



// equalize the differential by adding and subtracting the difference from the largest bill
// currently this only adds the bills
let equalizeBills = () => {

    let roommateTotals = [];
    dividedBills.forEach((arr, index) => {
        let total = 0;
        arr.forEach((item) => {

            total = moneyMath.add(total.toString(), item);

        });
        roommateTotals.push(total);
    });

    let evenlyDivided = moneyMath.div(billsTotalAmount().toString(), numberOfRoommates.toString());

    let runningTotal = 0;

    roommateTotals.map((item, index) => {
        let overage = 0;
        if (item > evenlyDivided) {
            overage = moneyMath.subtract(item, evenlyDivided);
            runningTotal = moneyMath.add(overage, runningTotal.toString())
            dividedBills[index][0] = moneyMath.subtract(dividedBills[index][0], overage.toString())
        }
        if (item < evenlyDivided) {
            let shortage = moneyMath.subtract(evenlyDivided, item);
            dividedBills[index][0] = moneyMath.add(dividedBills[index][0], shortage)
        }
    })

    console.log('each roommates final payment amount')
    console.log(dividedBills)

};

distributeSmallBills(smallBills);

equalizeBills();





