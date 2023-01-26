"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_NAME = exports.DB_HOST = void 0;
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_HOST = DB_HOST;
var DB_USER = process.env.DB_USER || 'root';
exports.DB_USER = DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_PASSWORD = DB_PASSWORD;
var DB_NAME = process.env.DB_NAME || 'database_links';
exports.DB_NAME = DB_NAME;
var DB_PORT = process.env.DB_PORT || 3306;
exports.DB_PORT = DB_PORT;