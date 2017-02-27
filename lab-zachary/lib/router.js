'use strict';

const Promise = require('bluebird');
const parseUrl = require('./parse-url.js');
const parseBody = require('./parse-body.js');
const writeResponse = require('./response.js');

const Router = module.exports = function (){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};
Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};
Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};
Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseBody(req),
    ])
    .then( () => {
      //request is valid, check if route is registered
      if (typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      //endpoint not found/route not registered. return 404
      writeResponse.sendText(res, 404, 'not found (router.js)');
      res.end();
    })
    .catch( err => { //promise.all fails, url or post body malformed
      console.error(err);
      writeResponse.sendText(res, 400, 'bad request');
    });
  };
};