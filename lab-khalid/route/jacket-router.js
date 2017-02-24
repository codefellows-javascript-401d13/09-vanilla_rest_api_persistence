'use strict';
const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Jacket = require('../model/jacket.js');

module.exports = function(router) {
  router.get('/api/jacket', function(req, res){
    if(req.url.query.id) {
      storage.fetchItem('jacket', req.url.query.id)
      .then(jacket => {
        console.log('Fetch the jacket');
        response.sendJSON(res, 200, jacket);
      })
      .catch(err => {
        console.log('Didnt get the jacket');
        console.error(err);
        response.sendText(res, 404, 'Not found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad request');
  });

  router.post('/api/jacket', function(req,res){
    try{
      var jacket = new Jacket(req.body.name, req.body.content);
      storage.createItem('jacket', jacket);
      response.sendJSON(res, 200, jacket);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'Bad request')
    }
  })
};
