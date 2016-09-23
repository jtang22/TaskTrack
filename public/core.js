// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};
  // when landing on page, get all todos and show them
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $http.get('/api/completes')
    .success(function(data) {
      $scope.completes = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send text to node API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; //clear form so user can enter another
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete a todo after checking it, add todo to completed list
  $scope.deleteTodo = function(id) {
    $http.get('/api/todos/' + id)
      .success(function(data) {
        $http.post('/api/completes', data)
        .success(function(data) {
          $scope.completes = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error ' + data);
        });
        console.log(data);
      })
      .error(function(data) {
        console.log('Error ' + data);
      });

    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
