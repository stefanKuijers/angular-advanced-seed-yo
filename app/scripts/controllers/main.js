'use strict';

/**
 * @ngdoc function
 * @name aasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aasApp
 */
angular.module('aasApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
