"use strict";

var _socket = require("socket.io");
var _config = require("./config.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var express = require('express');
var morgan = require('morgan');
var _require = require('express-handlebars'),
  engine = _require.engine;
var path = require('path');
var _require2 = require('mysql/lib/protocol/constants/client'),
  CLIENT_PLUGIN_AUTH = _require2.CLIENT_PLUGIN_AUTH;
var flash = require('connect-flash');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var _require3 = require('./keys'),
  database = _require3.database;
var passport = require('passport');
var http = require('http');
var device = require('express-device');
//inicializaciones
var app = express();
var Server = http.createServer(app);
var io = new _socket.Server(Server);
require('./lib/passport');

//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  patialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
  secret: 'sesionrapidamysql',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: _defineProperty({
    path: '/',
    httpOnly: true,
    maxAge: 'COOKIE_TIMEOUT'
  }, "maxAge", 1000 * 60 * 60 * 24 * 365),
  maxAge: 1000 * 60 * 60 * 24 * 365,
  store: new MySQLStore(database)
}));
app.use(device.capture());
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//gloal variables
app.use(function (req, res, next) {
  app.locals.success = req.flash('success');
  app.locals.warning = req.flash('warning');
  app.locals.danger = req.flash('danger');
  app.locals.user = req.user;
  req.device.type == 'desktop' ? app.locals.desk = true : app.locals.desk = false;
  next();
});

//archivos publicos
app.use(express["static"](path.join(__dirname, 'public')));

//rutas
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links')(io));
app.use(require('./routes/index'));

//iniciar servidor
Server.listen(_config.PORT, function () {
  console.log('Servidor en el puerto', _config.PORT);
});