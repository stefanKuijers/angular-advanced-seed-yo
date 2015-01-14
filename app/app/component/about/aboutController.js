'use strict';

angular.module('aas.component.about.controller', ['aas.shared.api.service'])
    .controller('AboutController', ['API', function(API) {
        var vm = this;

        vm.homeMessage = 'Hello';

        vm.helloTo = function( subject ) {
            return vm.homeMessage + ' ' + subject;
        };
    }]
);