angular.module('exampleApp', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/userList.html',
                controller: 'UserCtrl'
            })
            .when('/user/:userName', {
                templateUrl: 'views/userView.html',
                controller: 'UserCtrl'
            })
            .otherwise({
                templateUrl: 'views/errors/not-found-page.html',
            })
    }
])
