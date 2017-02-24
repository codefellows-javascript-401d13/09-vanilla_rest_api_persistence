'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix : 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaname, item){
  if(!schemaname) return Promise.reject(new Error('Shemaname not provided'));
  if(!item) return Promise.reject(new Error('Item not provided'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaname}/${item.id}.json`, json)
  .then(() => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaname, id){
  if(!schemaname) return Promise.reject(new Error('Schemane not provided'));
  if(!id) return Promise.reject(new Error('Id not provided'));
  return fs.readFileProm(`${__dirname}/../data/${schemaname}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(err));
}
