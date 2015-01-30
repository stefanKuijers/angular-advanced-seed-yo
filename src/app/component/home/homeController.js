
angular.module('aas.component.home.controller', ['aas.shared.api.service'])
    .controller('HomeController', ['API', function(API) {
        var vm = this;

        console.log( API);

        vm.awesomeThings = ['grunt', 'yeoman', 'bower'];
    }]
);