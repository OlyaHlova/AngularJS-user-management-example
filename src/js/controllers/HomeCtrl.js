angular.module('exampleApp')
.controller('HomeCtrl', [
    '$scope',
    function ($scope) {
        $scope.message = 'Custom test message';
    }
])
