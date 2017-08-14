const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      methodOverride = require('method-override'),
      path = require('path'),
      users = require('./routes/users');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

// app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', users);

app.get('/', function(req, res, next){
  res.render('layout');
});

module.exports = app;
