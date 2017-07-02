const chai = require('chai');
const should = chai.should();

const {
    equalizeBills,
    billsTotalAmount,
    sortBillsLargestToSmallest,
    removeBillsOverCertainAmount,
    removeBillsUnderCertainAmount,
    eachRoommateArrayEmpty,
    distributeSmallBills,
    divideBillsBetweenRoommates,
    findCurrentTotalsForEachRoommate,
    billingSummary
} = require('../src/app/divide-expenses');

describe('equalize bill function', function () {
    it('pass an empty array, returns an empty array', function () {
        const empty = equalizeBills([], [], '1.00');

        empty.should.eql([]);
    })

    it('divide one bill by two roommates', function () {
        const bills = ['300.00']
        const dividedBills = [['100.00'], ['200.00']]
        const correctOutput = [['150.00'], ['150.00']]
        const numberOfRoommates = '2.00';

        const divided = equalizeBills(dividedBills, bills, numberOfRoommates);

        divided.should.eql(correctOutput);
    })
})

describe('test bills total amount function', function () {
    it('returns the total amount stored in an array', function () {
        const bills = ['300.00', '450.00', '1000.00']
        const total = '1750.00';

        const returnedTotal = billsTotalAmount(bills);

        total.should.equal(returnedTotal);
    })
})

describe('tests bills sorted largests to smallests', function () {
    it('returns an array sorted largests to smallests', function () {
        const unSorted = ['300.00', '150.00', '20.00', '1000.00'];
        const results = ['1000.00', '300.00', '150.00', '20.00'];

        const returnedResults = sortBillsLargestToSmallest(unSorted);

        results.should.eql(returnedResults);
    })
})

describe('test the remove bills over and under a certain amount function', function () {
    it('returns an array of bills over a certain amount', function () {
        const amount = '300.00'
        const bills = ['450.00', '500.00', '250.00', '100.00', '50.00'];
        const returnedResults = ['450.00', '500.00']

        const results = removeBillsOverCertainAmount(bills, amount);
        results.should.eql(returnedResults)
    })

    it('returns an array of bills under a certain amount', function () {
        const amount = '300.00'
        const bills = ['450.00', '500.00', '250.00', '100.00', '50.00'];
        const returnedResults = ['250.00', '100.00', '50.00']

        const results = removeBillsUnderCertainAmount(bills, amount);
        results.should.eql(returnedResults)
    })
})

describe('test the build an empty array per roommate function', function () {
    it('returns an array of empty arrays', function () {
        const numberOfRoommates = 3;
        const correctResults = [[], [], []];

        const results = eachRoommateArrayEmpty(numberOfRoommates);

        results.should.eql(correctResults)
    })
})

describe('test divide bills between roommate', function () {
    it('should return an array of arrays with bills distributed to each roommate', function () {
        const bills = ['300.00', '450.00', '500.00', '100.00', '50.00', '200.00'];
        const amount = '300.00';
        const numberOfRoommates = '2.00';
        const results = [['250.00', '225.00', '150.00', '200.00'], ['250.00', '225.00', '150.00', '100.00', '50.00']];

        const returnedResults = divideBillsBetweenRoommates(bills, amount, numberOfRoommates);

        returnedResults.should.eql(results);
    })
})

describe('test find current totals for each roommate', function () {
    it('should return an array with the total each roommate currently owes', function () {
        const roommatesExpenses = [['200.00', '900.00', '300.00'], ['400.00', '500.00', '75.00']];
        const totals = ['1400.00', '975.00']

        const returnedResults = findCurrentTotalsForEachRoommate(roommatesExpenses);

        returnedResults.should.eql(totals);
    })
})

describe('test distribute small bills to each roommate', function () {
    it('should return an array of arrays containing bills distributed in a certain way', function () {
        const smallerBills = ['270.00', '225.00', '75.00', '13.00'];
        const dividedBills = [[], []];
        const numberOfRoommates = '2.00';

        const correctOutput = [['270.00', '13.00'], ['225.00', '75.00']]

        const returnedResults = distributeSmallBills(smallerBills, dividedBills, numberOfRoommates);

        returnedResults.should.eql(correctOutput);
    })
})