// server.js

//setup

var express = require('express');
var app = express(); //create app with express
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration ======
//jtang22:0229dbt@ds033116.mlab.com:33116/tasktrack ====
//mLab connection

mongoose.connect('mongodb://localhost/tasktrack');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// define RESTful API Todo model =======
var Todo = mongoose.model('Todo', {
  text : String
});

//listen (app starts with node server.js) ====
app.listen(8080);
console.log("App listening on port 8080");

// routes ==================
// api -------
// get all todos
