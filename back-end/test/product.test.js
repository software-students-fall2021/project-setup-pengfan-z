const chai = require('chai');

const { expect } = chai;
// should not delete the following line even though eslint reports some errors
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('/First Test Collection', () => {
  it('test API default route', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        const actualVal = res.body;
        expect(actualVal).to.be.equal('Hello World.');
        // console.log(res.body);
        done();
      });
  });

  it('test /major route', (done) => {
    chai
      .request(server)
      .get('/majors/NY')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const actualVal = res.body.ENGR.name;
        // console.log(actualVal);
        expect(actualVal).to.be.equal('Engineering');
        done();
      });
  });

  it('test /major route error handling', (done) => {
    chai
      .request(server)
      .get('/majors/a')
      .end((err, res) => {
        res.should.have.status(400);
        // res.body.should.be.a('string');
        // const actualVal = res.body.ENGR.name;
        // // console.log(actualVal);
        // expect(actualVal).to.be.equal('Engineering');
        done();
      });
  });

  it('test /courses route', (done) => {
    chai
      .request(server)
      .get('/courses/UA/CSCI')
      .end((err, res) => {
        res.should.have.status(200);
        const actual = res.body[0].name;
        const expected = 'Introduction to Computer Programming (Limited Prior Experience)';
        expect(actual).to.be.equal(expected);
        done();
      });
  });

  it('test /courses route error handling', (done) => {
    chai
      .request(server)
      .get('/courses/UA/ihniodqw')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  // hello world test
  //   it('should test two values', () => {
  //     // actual test content in here
  //     const expectedVal = 10;
  //     const actualVal = 10;

  //     expect(actualVal).to.be.equal(expectedVal);
  //   });
});
