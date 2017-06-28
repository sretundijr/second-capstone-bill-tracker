const chai = require('chai');
const should = chai.should();

const CreateHouseState = require('../src/app/manage-state')

describe("Testing state management", function () {

    let state = new CreateHouseState();

    it('should add a roommate object and return the length roommate array', function () {
        var nameObj = 'hello testing';
        var newState = state.addRoommate(nameObj);
        newState.should.equal([nameObj].length);
    })

    it('should remove a roommate', function () {
        state.addRoommate('hello testing')
        // there are currently two roommates after the previous call
        newState = state.removeRoommate(0);

        newState.should.equal(1);
    })

    it('should add a new expense', function () {
        let expense = { name: 'steve', amount: '1000.01', dueDate: '01/30/2017' };

        let correctOutput = { name: 'steve', amount: '1000.01', dueDate: '01/30/2017' };

        let newState = state.addExpenseToState(expense);

        newState.name.should.equal(correctOutput.name);
        newState.amount.should.equal(correctOutput.amount);
        newState.dueDate.should.equal(correctOutput.dueDate);
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