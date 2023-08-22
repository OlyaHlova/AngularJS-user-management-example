angular.module('exampleApp')
.controller('formCtrl', function($scope) {
    console.log('secondCtrl');
    $scope.inputData = 'input data';
    $scope.createUser = function(name) {
        console.log(`This is the user ${name}`);
    }
});