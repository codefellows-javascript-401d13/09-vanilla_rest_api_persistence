'use strict';

module.exports = exports = {};

exports.sendText = function(res, statusCode, msg) {
  res.writeHead(statusCode, {
    'Content-type': 'text/plain',
  });
  res.write(msg);
  res.end();
};

exports.sendJSON = function(res, statusCode, json) {
  res.writeHead(statusCode, {
    'Content-type': 'application/json',
  });
  res.write(JSON.stringify(json));
  res.end();
};
