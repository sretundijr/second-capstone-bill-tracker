const chai = require('chai');
const should = chai.should();

const {
    sortBillsLargestToSmallest,
    removeBillsOverCertainAmount,
    removeBillsUnderCertainAmount,
    eachRoommateArrayEmpty,
    distributeSmallBills,
    divideBillsBetweenRoommates,
    findCurrentTotalsForEachRoommate,

    equalizeBills,
    billsTotalAmount,

    billingSummary
} = require('../src/app/divide-expenses');

describe('tests bills sorted largests to smallests', function () {
    it('returns an array objects with an amount field sorted largests to smallests', function () {
        const unSorted = [{ amount: '300.00' }, { amount: '150.00' }, { amount: '20.00' }, { amount: '1000.00' }];
        const results = [{ amount: '1000.00' }, { amount: '300.00' }, { amount: '150.00' }, { amount: '20.00' }];

        const returnedResults = sortBillsLargestToSmallest(unSorted);

        results.should.eql(returnedResults);
    })
})

describe('test the remove bills over and under a certain amount function', function () {
    it('returns an array of bills over a certain amount', function () {
        const amount = '300.00'
        const bills = [{ amount: '450.00' }, { amount: '500.00' }, { amount: '250.00' }, { amount: '100.00' }, { amount: '50.00' }];
        const returnedResults = [{ amount: '450.00' }, { amount: '500.00' }]

        const results = removeBillsOverCertainAmount(bills, amount);
        results.should.eql(returnedResults)
    })

    it('returns an array of bills under a certain amount', function () {
        const amount = '300.00'
        const bills = [{ amount: '450.00' }, { amount: '500.00' }, { amount: '250.00' }, { amount: '100.00' }, { amount: '50.00' }];
        const returnedResults = [{ amount: '250.00' }, { amount: '100.00' }, { amount: '50.00' }]

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

describe('test distribute small bills to each roommate', function () {
    it('should return an array of arrays containing bills distributed in a certain way', function () {
        const smallerBills = [{ amount: '270.00' }, { amount: '225.00' }, { amount: '75.00' }, { amount: '13.00' }];
        const dividedBills = [[], []];
        const numberOfRoommates = '2.00';

        const correctOutput = [
            [
                { amount: '270.00', roommateAmountDue: '270.00' }, { amount: '13.00', roommateAmountDue: '13.00' }
            ],
            [
                { amount: '225.00', roommateAmountDue: '225.00' }, { amount: '75.00', roommateAmountDue: '75.00' }
            ]
        ]

        const returnedResults = distributeSmallBills(smallerBills, dividedBills, numberOfRoommates);

        returnedResults.should.eql(correctOutput);
    })
})

describe('test divide bills between roommate', function () {
    it('should return an array of arrays with bills distributed to each roommate', function () {
        const bills = [{ amount: '300.00' }, { amount: '450.00' }, { amount: '500.00' }, { amount: '100.00' }, { amount: '50.00' }, { amount: '200.00' }];
        const amount = '300.00';
        const numberOfRoommates = '2.00';
        const results = [
            [
                { amount: '500.00', roommateAmountDue: '250.00' },
                { amount: '450.00', roommateAmountDue: '225.00' },
                { amount: '300.00', roommateAmountDue: '150.00' },
                { amount: '200.00', roommateAmountDue: '200.00' }
            ],
            [
                { amount: '500.00', roommateAmountDue: '250.00' },
                { amount: '450.00', roommateAmountDue: '225.00' },
                { amount: '300.00', roommateAmountDue: '150.00' },
                { amount: '100.00', roommateAmountDue: '100.00' },
                { amount: '50.00', roommateAmountDue: '50.00' }
            ]
        ];

        const returnedResults = divideBillsBetweenRoommates(bills, amount, numberOfRoommates);

        returnedResults.should.eql(results);
    })
})

describe('test find current totals for each roommate', function () {
    it('should return an array with the total each roommate currently owes', function () {
        const roommatesExpenses = [
            [
                { roommateAmountDue: '200.00' }, { roommateAmountDue: '900.00' }, { roommateAmountDue: '300.00' }
            ],
            [
                { roommateAmountDue: '400.00' }, { roommateAmountDue: '500.00' }, { roommateAmountDue: '75.00' }
            ]
        ];
        const totals = ['1400.00', '975.00']

        const returnedResults = findCurrentTotalsForEachRoommate(roommatesExpenses);

        returnedResults.should.eql(totals);
    })
})

describe('test bills total amount function', function () {
    it('returns the total amount stored in an array', function () {
        const bills = [{ amount: '450.00' }, { amount: '500.00' }, { amount: '250.00' }, { amount: '100.00' }, { amount: '50.00' }];
        const total = '1350.00';

        const returnedTotal = billsTotalAmount(bills);

        total.should.equal(returnedTotal);
    })
})

describe('equalize bill function', function () {
    it('pass an empty array, returns an empty array', function () {
        const empty = equalizeBills([], [], '1.00');

        empty.should.eql([]);
    })

    it('divide one bill by two roommates', function () {
        const bills = [{ amount: '300.00' }]
        const dividedBills = [[{ roommateAmountDue: '100.00' }], [{ roommateAmountDue: '200.00' }]]
        const correctOutput = [[{ roommateAmountDue: '150.00' }], [{ roommateAmountDue: '150.00' }]]
        const numberOfRoommates = '2.00';

        const divided = equalizeBills(dividedBills, bills, numberOfRoommates);

        divided.should.eql(correctOutput);
    })
})












