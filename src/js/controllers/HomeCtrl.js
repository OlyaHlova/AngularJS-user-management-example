angular.module('exampleApp')
.controller('HomeCtrl', [
    '$scope',
    function ($scope) {
        $scope.message = 'This is user list ##';
    }
])
