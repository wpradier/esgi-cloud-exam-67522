const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// database dependency
const Article = require('./article.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function (req, res, next) {
  let articles = [];
  try {
    articles = await Article.findAll();
  } catch (e) {}
  res.render('index', {articles});
});

app.post('/', async function (req, res, next) {
  const {title, content} = req.body;
  try {
    await Article.create({ title, content });
  } catch (e) {}
  res.redirect('/');
});

app.get('/articles', async function (req, res, next) {
  let articles = [];
  try {
    articles = await Article.findAll();
  } catch (e) {}
  res.send(JSON.stringify(articles, null, 2));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
