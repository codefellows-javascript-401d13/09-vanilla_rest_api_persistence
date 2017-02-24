'use strict';

const Bike = require('../model/bike.js');
const storage = require('../lib/storage.js');
const writeResponse = require('../lib/response.js');

const itemType = 'bike';

module.exports = function (router){
  router.get(`/api/${itemType}`, function(req, res){
    if(req.url.query.id){
      storage.fetchItem('bike', req.url.query.id)//promise
      .then( bike => {
        writeResponse.sendJSON(res, 200, bike);
      }).catch( err => {
        console.error(err);
        writeResponse.sendText(res, 404, 'not found');
      });
      return;
    }
    writeResponse.sendText(res, 400, 'bad request');
  });

  router.post(`/api/${itemType}`, function(req, res){
    try{
      var bike = new Bike(req.body.name, req.body.content, 'bike');
      storage.createItem('bike', bike);
      writeResponse.sendJSON(res, 200, bike); //<-- look into this bike parameter being passed
    } catch (err) {
      console.error(err);
      writeResponse.sendText(res, 400, 'bad request');
    }
  });
  router.delete(`/api/${itemType}`, function(req, res){
    if(req.url.query.id){
      storage.deleteItem('bike', req.url.query.id)
      .then( bike => {
        writeResponse.sendJSON(res, 204, bike);
      }).catch( err => {
        console.error(err);
        writeResponse.sendText(res, 404, 'not found');
      });
      return;
    }
    writeResponse.sendText(res, 400, 'bad request');
  });

};
