'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require(`${__dirname}/../server.js`);

describe('Team Routes', function() {
  let testTeam = null;
  describe('POST :3000/api/team', function() {
    it('should create a file with a team', function(done) {
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
    it('should return an error with an invalid team', function(done) {
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
});
