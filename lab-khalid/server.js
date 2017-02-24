'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const router = new Router();

require('./route/jacket-router.js')(router)


const Server = http.createServer(router.route());
Server.listen(PORT, () => console.log('SERVER RUNNING AT PORT ',8000));
