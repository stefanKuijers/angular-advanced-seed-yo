'use strict';

/**
 * @ngdoc function
 * @name aasyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aasyApp
 */
angular.module('aasyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
