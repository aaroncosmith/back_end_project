const createError = require('http-errors'),
session = require('express-session'),
FileStore = require('session-file-store')(session),
express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
upload = require("express-fileupload"),
es6Renderer = require('express-es6-template-engine');



const indexRouter = require('./routes/index'),
usersRouter = require('./routes/users'),
singleImgRouter = require('./routes/images'),
profileRouter = require('./routes/profile');


const app = express();

app.use(upload()) 
    console.log("Server Started!");
    
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
  is_logged_in: false,
}));

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');



app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/users', usersRouter)
app.use('/single-img', singleImgRouter)
=======
app.use('/users', usersRouter);
app.use('/images', singleImgRouter);
app.use('/profile', profileRouter);
>>>>>>> 7b50beecd0e88de5be2c05ad9b294eb2194d75fc

module.exports = app;