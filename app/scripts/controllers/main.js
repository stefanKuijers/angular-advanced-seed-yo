'use strict';

/**
 * @ngdoc function
 * @name aasyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aasyApp
 */
angular.module('aasyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
