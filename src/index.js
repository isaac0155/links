const express = require ('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const { CLIENT_PLUGIN_AUTH } = require('mysql/lib/protocol/constants/client');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
import { Server as WebSocketServer } from "socket.io";
const http = require('http')
import Sockets from "./routes/sockets"

//inicializaciones
const app = express();
const Server = http.createServer(app)
const io = new WebSocketServer(Server);
require('./lib/passport');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    patialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs')

//middlewares
app.use(session({
    secret: 'sesionrapidamysql',
    resave: false, 
    saveUninitialized: false,
    rolling: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 'COOKIE_TIMEOUT',
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
    maxAge: 1000 * 60 * 60 * 24 * 365,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//gloal variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.warning = req.flash('warning');
    app.locals.danger = req.flash('danger');
    app.locals.user = req.user;
    next();
});

//archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));
app.use(require('./routes/index'));

//iniciar servidor
Server.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto', app.get('port'));
});

Sockets(io);