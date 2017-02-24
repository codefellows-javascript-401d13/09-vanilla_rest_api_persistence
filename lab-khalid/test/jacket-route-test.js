'use strict';

const request = require('superagent');
const expect = require('chai').expect;
require('../server.js');

describe('Jacket routes', function() {
  var jacket = null;
  describe('POST: api/jacket', function() {
    it('Should return a jacket', function(done){
      request.post('localhost:8000/api/jacket')
      .send({name : 'test name', content: 'test content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        jacket = res.body
        done();
      });
    });
  });

  describe('GET: /api/jacket', function() {
    it('should get a jacket', function(done){
      request.get(`localhost:8000/api/jacket?id=${jacket.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
  })
});
