'use strict';

const storage = require('./lib/storage.js');

console.log(storage.createItem('sneaker', {id: 32423423, model: 'test model', brand: 'test brand'}));
