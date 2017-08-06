const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { runServer, app, closeServer } = require('../src/server');
chai.use(chaiHttp);

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
      });
  });

  it('should return house stats', function () {
    return chai.request(app)
      .get('/house-stats/steve-christina')
      .then(function (res) {
        res.should.have.status(200);
      });
  });
});
