const createError = require('http-errors'),
session = require('express-session'),
FileStore = require('session-file-store')(session),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
es6Renderer = require('express-es6-template-engine');

const indexRouter = require('./routes/index'),
usersRouter = require('./routes/users'),
singleImgRouter = require('./routes/images');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session ({
  resave: false,
  secret: 'hello',
  saveUninitialized: true,
  is_logged_in: false
}));

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');



app.use('/', indexRouter);
app.use('/users', usersRouter)
app.use('/single-img', singleImgRouter)

module.exports = app;
