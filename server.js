'use strict';

const http = require('http');
const Router = require(`${__dirname}/lib/router.js`);
const PORT = process.env.PORT || 3000;
const router = new Router();

require(`${__dirname}/routes/team-routes.js`)(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server's up on PORT: ${PORT}`);
});
