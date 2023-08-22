angular.module('exampleApp')
.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    function ($scope, $routeParams, $http) {
        $scope.message = 'message';
        $scope.userName = $routeParams.userName;
        console.log('$routeParams', $routeParams.userName);

        $http({
            method: 'GET',
            url: 'http://localhost:3002/users'
        }).then(function (response) {
            console.log('sucess', response);
            $scope.users = response.data;
        },
        function (error) {
            console.log('error', error);
        });  


        
        $scope.addUser = function (user) {
            console.log("user", user);
            $http.post('http://localhost:3002/users', user)
            .then(function (result) {
                console.log('sucess SAVED', result);
                $scope.users.push(user);
                $scope.user = null;
            }),
            function (error) {
                console.log('error in POST', error);
            };  
                  
        }

    }

]);
