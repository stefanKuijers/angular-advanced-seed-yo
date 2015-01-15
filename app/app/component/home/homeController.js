// 'use strict';

angular.module('aas.component.home.controller', ['aas.shared.api.service'])
    .controller('HomeController', ['API', function(API) {
        var vm = this;

        console.log( API );

        vm.homeMessage = 'Hello';

        vm.helloTo = function( subject ) {
            return vm.homeMessage + ' ' + subject;
        };
    }]
);