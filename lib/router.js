'use strict';

const parseUrl = require(`${__dirname}/parse-url.js`);
const parseJSON = require(`${__dirname}/parse-json.js`);
const response = require(`${__dirname}/response.js`);

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req)
    ])
    .then( () => {
      console.log('inside then block', req.method);
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      console.error('route not found');

      response.sendText(res, 404, 'route not found');
    })
    .catch(err => {
      console.error(err);

      response.sendText(res, 400, 'bad request');
    });
  };
};
