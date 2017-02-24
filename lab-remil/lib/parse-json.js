'use strict';

module.exports = function(req) {
  if ( req.method === 'POST' || req.method === 'PUT') {
    let body = '';

    req.on('data', data => {
      body += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        return Promise.resolve(req);
      } catch(err) {
        console.error(err);
        return Promise.reject(err);
      }
    });

    req.on('error', err => {
      console.error(err);
      return Promise.reject(err);
    });

    return;
  }
  return Promise.resolve();
};
