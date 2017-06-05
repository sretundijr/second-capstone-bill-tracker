const chai = require('chai');
const should = chai.should();

const { totalAmount, totalNumberOfBills } = require('../src/app/stats-summary');

const testArr = [{ amount: 500 }, { amount: 1250 }, { amount: 75 }];


describe("testing stats summary", function () {
    it('should return the total amount', function () {
        var total = testArr.map(function (item) {
            return total += item.amount;
        })

        var total = totalAmount(testArr);

        total.should.equal(total);
    })

    it('should return total number of bills', function () {
        var total = totalNumberOfBills();

        total.should.equal(16)
    })
})