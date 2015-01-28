'use strict';

window.App = angular.module(
    'aas', 
    [
      'ngAnimate',

      'ui.router',
      'mgcrea.ngStrap',

      'aas.router'
      // 'aas.shared.layout.menu.controller'
    ]
).run(['$rootScope', function( $rootScope ) {
        console.log( $rootScope );
    }]
);