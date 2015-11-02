'use strict';

angular.module('notes').controller('NotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notes',
  function($scope, $stateParams, $location, Authentication, Notes) {

    $scope.authentication = Authentication;

    $scope.create = function() {
      var note = new Notes({
        content : this.content
      });

      note.$save(function(response) {
        //$location.path('/');
        $scope.find();
      }, function(err) {
        $scope.error = err.data.message;
      });

      this.content = '';
      $scope.resetForm();

    };

    $scope.remove = function(note) {
      if(note)
      {
        note.$remove();

        for(var i in $scope.notes)
        {
          if($scope.notes[i] === note) $scope.notes.splice(i, 1);
        }
      }
      else
      {
        $scope.note.$remove(function() {
          $location.path('notes');
        });
      }
    };

    $scope.update = function() {
      var note = $scope.note;

      note.$update(function() {
        $location.path('notes/' + note._id);
      }, function(err) {
        $scope.error = err.data.message;
      });
    };

    $scope.find = function() {
      $scope.notes = Notes.query();
    };

    $scope.findOne = function() {
      $scope.note = Notes.get({
        noteId: $stateParams.noteId
      });
    };

    $scope.resetForm = function() {
      if ($scope.form)
      {
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }
    };

  }
]);
