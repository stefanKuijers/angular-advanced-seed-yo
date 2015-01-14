'use strict';

/**
 * @ngdoc function
 * @name aasyoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aasyoApp
 */
angular.module('aasyoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
