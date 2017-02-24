'use strict';

const response = require('./response.js');
const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');
const Promise = require('bluebird');

const Router = module.exports = function Router() {   //eslint-disable
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  return this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  return this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  return this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  return this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseJSON(req),
      parseUrl(req),
    ])
    .then(() => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      response.sendText(res, 404, 'not found');
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 400, 'bad request router');
    });
  };
};
