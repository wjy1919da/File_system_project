const express = require('express');
const config = require('config');
const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require("./startup/config")();
require("./startup/validation")();
//console.log('Current NODE_ENV:', process.env.NODE_ENV);
const logger = require("./utils/logger");
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
   logger.info(`Listening on port ${port}...`)
);
module.exports = server;