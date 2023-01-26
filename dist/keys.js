"use strict";

var _config = require("./config.js");
module.exports = {
  database: {
    host: _config.DB_HOST,
    user: _config.DB_USER,
    password: _config.DB_PASSWORD,
    port: _config.DB_PORT,
    database: _config.DB_NAME
  }
};