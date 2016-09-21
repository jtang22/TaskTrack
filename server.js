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

var Complete = mongoose.model('Complete', {
  text : String,
  date : String
});

// routes ==================
// api -------
// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in DB
  Todo.find(function(err, todos) {

    //if error retrieving, send error

    if(err) {
      res.send(err);
    }
    res.json(todos); // return all todos in JSON format

  });
});

// Send back all completed Todos
app.get('/api/completes', function(req, res) {
  // use monogoose to get all completed todos in DB
  Complete.find(function(err, completes) {
    if(err) {
      res.send(err);
    }
    res.json(completes);
  });
});

// Create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
      if(err)
        res.send(err);

      //get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if(err)
          res.send(err);

        res.json(todos);
      });
  });
});

// Delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
      if(err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if(err)
          res.send(err);

        res.json(todos);
      });
  });
});

// application =======
app.get('*', function(req, res) {
  //load sinle view file, angular will handle page changes on front-end
  res.sendfile('./public/index.html');
});

//listen (app starts with node server.js) ====
app.listen(8080);
console.log("App listening on port 8080");
