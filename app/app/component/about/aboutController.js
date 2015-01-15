// 'use strict';

angular.module('aas.component.about.controller', ['aas.shared.api.service'])
    .controller('AboutController', ['API', function(API) {
        var vm = this;

        window.console.log( API );
        vm.homeMessage = 'Hello';

        vm.helloTo = function( subject ) {
            return vm.homeMessage + ' ' + subject;
        };
    }]
);