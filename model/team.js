'use strict';

const uuid = require('node-uuid');

module.exports = function(name, city) {
  if (!name) throw new Error('name expected');
  if (!city) throw new Error('city expected');

  this.name = name;
  this.city = city;
  this.id = uuid.v1();
};
