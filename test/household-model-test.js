const chai = require('chai');
const should = chai.should();
const { Household, createHousehold } = require('../src/models/household-model')
const mongoose = require('mongoose');

const mockHouse = () => {
  return {
    "name": "steve",
    "expenses":
    [
      {
        "amount": "100",
        "name": "electric",
        "dueDate": "2017-11-11"
      },
      {
        "amount": "500",
        "name": "auto",
        "dueDate": "2017-13-12"
      }
    ],
    "roommates":
    [
      {
        "name": "steve"
      },
      {
        "name": "Christina"
      }
    ]
  }
};

// function tearDownDb() {
//   console.warn('Deleting database');
//   return mongoose.connection.dropDatabase();
// }

describe('test the household model', () => {
  // afterEach(function () {
  //   return tearDownDb();
  // });

  it("should create household", () => {
    createHousehold(mockHouse())
      .then(() => {
        let dbResults = Household.findOne();
        mockHouse.should.equal({ dbResults });
      });
  })
});