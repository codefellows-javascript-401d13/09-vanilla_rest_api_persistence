'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

//create, fetch delete

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject( new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item) //whuck? look into this format. return item implied with function.
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected item'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch (err => Promise.reject(err));
};

exports.fetchAllItems = function(schemaName){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));

  return fs.readdirProm(`${__dirname}/../data/bike`)
  .then( data => {
    try{
      let items = {};
      for (var key of data.keys()) {
        items[key] = data[key];
      }
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch (err => Promise.reject(err));
};
exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( () => id)
  .catch( err => Promise.reject(err));
};



