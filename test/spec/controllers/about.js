'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('aas'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutController', {
      $scope: scope
    });
  }));

  it('should say hello', function () {
    expect( AboutCtrl.helloTo('Sebas') ).toBe( 'Hello Sebas');    
  });
});
