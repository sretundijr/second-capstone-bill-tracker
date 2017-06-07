const chai = require('chai');
const should = chai.should();

const { totalAmount, totalNumberOfBills } = require('../src/app/stats-summary');

const testArr = [{ amount: 500 }, { amount: 1250 }, { amount: 75 }];


describe("testing stats summary", function () {
    it('should return the total amount', function () {
        var expectedTotal = 500 + 1250 + 75;

        var total = totalAmount(testArr);

        total.should.equal(expectedTotal);
    })

    it('should return total number of bills', function () {
        var total = totalNumberOfBills(testArr);

        total.should.equal(3)
    })
})