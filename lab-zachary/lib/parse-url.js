'use strict';

const parse = require('url').parse;

module.exports = function(req){
  //return object with url, query string, parameters etc
  req.url = parse(req.url, true); //true parameter returns query string as an object
  return Promise.resolve(req);
};