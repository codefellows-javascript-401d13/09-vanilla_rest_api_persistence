'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require(`${__dirname}/../server.js`);

describe('Team Routes', function() {
  let testTeam = null;
  describe('POST :3000/api/team', function() {
    it('should create a file to store a team obj in', function(done) {
      request.post('localhost:3000/api/team')
      .send({ name: 'Sounders FC', city: 'Seattle, WA'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Sounders FC');
        expect(res.body.city).to.equal('Seattle, WA');
        testTeam = res.body;
        done();
      });
    });
    it('should return an error with an invalid team format', function(done) {
      request.post('localhost:3000/api/team')
      .send({ this: 'Is not', a: 'valid object'})
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
  describe('GET :3000/api/team', function() {
    it('should retrive a team obj stored in a file', function(done) {
      request.get(`localhost:3000/api/team/id=${testTeam.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(testTeam.name);
        expect(res.body.city).to.equal(testTeam.city);
        done();
      });
    });
    it('should return a 404 not found error', function(done) {
      request.get('localhost:3000/api/team/id=123456')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
    it('should return a 400 bad request error', function(done) {
      request.get('localhost:3000/api/team/')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
});
