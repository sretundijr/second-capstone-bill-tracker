const chai = require('chai');
const should = chai.should();

const { state } = require('../src/app/manage-state')

describe("Testing state management", function () {
    it('should add a roommate object and return the length roommate array', function () {
        var nameObj = 'hello testing';
        var newState = state.addRoommate(nameObj);
        newState.should.equal([nameObj].length);
    })

    it('should remove a roommate', function () {
        state.addRoommate('hello testing')

        newState = state.removeRoommate(0);

        newState.should.equal(1);
    })

    it('should add a new expense', function () {
        let expense = ['steve', 1000.01, 'hello this is not done yet'];

        let correctOutput = [{ name: 'steve', amount: 1000.01, dueDate: 'hello this is not done yet' }]

        let newState = state.addExpenseToState(expense);

        newState[0].name.should.equal(correctOutput[0].name);
        newState[0].amount.should.equal(correctOutput[0].amount);
    })

    it('should test ready submit, both expense and roommate have 1 item', function () {
        newState = state.readyForSubmit();

        newState.should.equal(true);
    })

    it('should remove the expense added in the previous test', function () {
        newState = state.removeExpense(0);
        newState.should.equal(0);
    })
})