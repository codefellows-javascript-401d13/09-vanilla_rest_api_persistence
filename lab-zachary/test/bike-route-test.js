'use strict';

const request = require ('superagent');
const expect = require('chai').expect;
const open = require('fs').openSync;

require('../server.js');

describe('Bike Route Test', function(){
  var bike = '';
  describe('POST route test', function(){
    it('Should return success with properly formatted request', function(done){
      request.post(':8000/api/bike')
      .send({'name':'test name', 'content':'test body content'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.content).to.equal('test body content');
        expect(res.body.name).to.equal('test name');
        bike=res;
        done();
      });
    });
    it('should resond with \'bad request\'if body content was not provided or was invalid', function(done){
      request.post('localhost:8000/api/bike')
      .send({invalid: 'content', willNot: 'work'})
      .end((err, res) => {
        expect(err.message).to.equal('Bad Request');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET route test', function(){
    it('should return a 200 on request w/proper query string', function(done){
      request.get(`:8000/api/bike?id=${bike.body.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test body content');
        done();
      });
    });
    it('should respond w/ \'not found\' for valid request w/id that was not found', function(done){
      request.get('localhost:8000/api/bike?id=not-an-id')
      .end((err, res) => {
        expect(err.message).to.equal('Not Found');
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should respond w/ all ids if no id provided', function(done){
      request.get('localhost:8000/api/bike?id=')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.some(e => e ===`${bike.body.id}.json`)).to.equal(true);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('DELETE route test', function(){
    it('should delete the bike record', function(done){
      request.delete(`:8000/api/bike?id=${bike.body.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(open.bind(open, `${__dirname}/../data/bike/${bike.body.id}.json`, 'r')).to.throw(Error);
        done();
      });
    });
  });
});
