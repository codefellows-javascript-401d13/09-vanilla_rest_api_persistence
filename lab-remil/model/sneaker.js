'use strict';

const uuid = require('node-uuid');

module.exports = function Sneaker(model, brand){
  if (!model) throw new Error('expected model');
  if (!brand) throw new Error('expected brand');

  this.id = uuid.v4();
  this.model = model;
  this.brand = brand;
};
