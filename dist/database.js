"use strict";

var mysql = require('mysql2');
var _require = require('util'),
  promisify = _require.promisify;
var _require2 = require('./keys'),
  database = _require2.database;
var pool = mysql.createPool(database);
//console.log(pool);
pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNETION_LOST') {
      console.error('cONEXION CON LA BASE DE DATOS CERRADA');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene muchas conexiones activas');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Conexion rechazada a la base de datos');
    }
  }
  if (connection) {
    connection.release();
    console.log('Base de datos conectada');
  }
  return;
});
pool.query = promisify(pool.query);
module.exports = pool;