const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
const mongoose = require('mongoose');

const { runServer, app, closeServer } = require('../src/server');
const Household = require('../src/models/household-model');
const mockHousehold = require('../src/app/mock-model');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

const mockPostReq = () => {
  return {
    name: 'steve',
    expenses:
    [
      {
        amount: '100',
        name: 'electric',
        dueDate: '2017-11-11',
      },
      {
        amount: '500',
        name: 'auto',
        dueDate: '2017-13-12',
      },
    ],
    roommates:
    [
      {
        name: 'steve',
      },
      {
        name: 'Christina',
      },
    ],
  };
};

function seedDatabase() {
  return Household.insertMany(mockHousehold[0]);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Household api endpoints', function () {
  // do I need this for this test
  before(() => runServer(TEST_DATABASE_URL));

  beforeEach(() => seedDatabase());

  afterEach(() => tearDownDb());

  after(() => closeServer());

  // this returns undefined once in awhile
  it('should get a household', () => {
    return chai.request(app)
      .get('/api/household')
      .then((res) => {
        res.should.have.status(200);
        res.body[0].should.be.an('object');
      });
  });

  it('should create a household', () => {
    return chai.request(app)
      .post('/api/household')
      .send(mockPostReq())
      .then((res) => {
        res.should.have.status(201);
        res.body.name.should.equal(mockPostReq().name);
      });
  });

  it('should edit an expense', () => {
    const update = { house_id: '', expense_id: '', amount: '' };
    return Household
      .findOne()
      .exec()
      .then((house) => {
        update.house_id = house.id;
        update.expense_id = house.expenses[0].id;
        update.amount = '433.33';
        return chai.request(app)
          .put(`/api/expenses/${update.house_id}`)
          .send(update);
      })
      .then((res) => {
        console.log(res.body);

        res.should.have.status(201);
      });
  });
});
