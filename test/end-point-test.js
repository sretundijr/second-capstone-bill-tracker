const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const { runServer, app, closeServer } = require('../src/server');
const { Household, createHousehold } = require('../src/models/household-model');

chai.use(chaiHttp);

require('sinon-mongoose');

// function tearDownDb() {
// 	console.warn('Deleting database');
// 	return mongoose.connection.dropDatabase();
// }

describe('Get a household', function () {
	// do I need this for this test
	before(function () {
		return runServer();
	});

	// afterEach(function () {
	// 	return tearDownDb();
	// });

	after(function () {
		return closeServer();
	});

	it('should get a household', function () {
		return chai.request(app)
			.get("/household")
			.then(function (res) {
				res.should.have.status(200);
			})
	})

	it('should create a household', function () {
		// let stub = sinon.stub(HouseholdModel, 'createHousehold', () => Promise.resolve({ name: 'bob' }));
		return chai.request(app)
			.post('/household')
			.send({ name: 'steve' })
			.then((res) => {
				res.should.have.status(201);
				res.body.name.should.equal('steve');
			})
	})
});


// ************************
// static end point tests
describe('test static endpoints', function () {
	before(function () {
		return runServer();
	});
	after(function () {
		return closeServer();
	});

	it('should return index', function () {
		return chai.request(app)
			.get('/')
			.then(function (res) {
				res.should.have.status(200);
			})
	})

	it('should return house stats', function () {
		return chai.request(app)
			.get('/house-stats')
			.then(function (res) {
				res.should.have.status(200);
			})
	})
})

// saved for later
// it('return a household', function () {
	// 	var householdMock = sinon.mock(Household);
	// 	var expectedResults = { status: true, house: [] };
	// 	console.log(householdMock);
	// 	householdMock.expects('find').resolves(expectedResults);
	// 	Household.find(function (err, results) {
	// 		householdMock.verify();
	// 		householdMock.restore();
	// 		expect(results.status).to.be.true;
	// 		done();
	// 	})
	// })