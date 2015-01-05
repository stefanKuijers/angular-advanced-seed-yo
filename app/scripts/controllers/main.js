'use strict';

/**
 * @ngdoc function
 * @name aasyoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aasyoApp
 */
angular.module('aasyoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
