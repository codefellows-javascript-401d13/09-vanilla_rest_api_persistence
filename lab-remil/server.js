'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const router = new Router();
const PORT = process.env.PORT | 3000;

//remove yo ////////////////////////////
const response = require('./lib/response.js');
const Sneaker = require('./model/sneaker.js');
const storage = require('./lib/storage.js');
/////////////////////////////////////////////

router.post('/api/sneaker', (req, res) => {
  try {
    let sneaker = new Sneaker(req.body.model, req.body.brand);
    storage.createItem('sneaker', sneaker);
    response.sendJSON(res, 200, sneaker);
  } catch (err) {
    console.error(err);
    response.sendText(res, 400, 'bad post');
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => console.log('Servin\' it up on: ', PORT));
