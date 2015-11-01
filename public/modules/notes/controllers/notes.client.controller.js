'use strict';

angular.module('notes').controller('NotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notes',
  function($scope, $stateParams, $location, Authentication, Notes) {

    $scope.authentication = Authentication;

    $scope.create = function() {

    };

    $scope.remove = function(note) {

    };

    $scope.update = function() {

    };

    $scope.find = function() {
      $scope.notes = Notes.query();
    };

    $scope.findOne = function() {

    };

  }
]);
