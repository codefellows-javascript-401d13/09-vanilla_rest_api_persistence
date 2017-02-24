'use strict';

const response = require('../lib/response.js');
const Sneaker = require('../model/sneaker.js');
const storage = require('../lib/storage.js');

module.exports = function(router){
  router.post('/api/sneaker', (req, res) => {
    try {
      let sneaker = new Sneaker(req.body.model, req.body.brand);
      storage.createItem('sneaker', sneaker);
      response.sendJSON(res, 200, sneaker);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad post request');
    }
  });

  router.get('/api/sneaker', (req, res) => {
    if (req.url.query.id) {
      storage.fetchItem('sneaker', req.url.query.id)
      .then( sneaker => {
        response.sendJSON(res, 200, sneaker);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.delete('/api/sneaker', (req, res) => {
    if (req.url.query.id) {
      storage.deleteItem('sneaker', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'delete complete');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
