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
        // state.addRoommate('hello testing')
        // state.addRoommate('hello testing')
        // state.addRoommate('hello testing')

        newState = state.removeRoommate(0);
        console.log(state);
        console.log(newState);

        newState.should.equal(1);

    })
})