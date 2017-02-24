'use strict';

const uuid = require('node-uuid');
module.exports = function(name, content){
  if(!name) throw new Error('Name not provided');
  if(!content) throw new Error('Content not provided');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};
