angular.module('exampleApp', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user-list.html',
                controller: 'UserCtrl'
            })
            .when('/user/:userName', {
                templateUrl: 'views/user-view.html',
                controller: 'UserCtrl'
            })
            .when('/403', {
                templateUrl: 'views/errors/forbidden-page.html',
            })
            .when('/404', {
                templateUrl: 'views/errors/not-found-page.html',
            })
            .otherwise({
                templateUrl: 'views/errors/not-found-page.html',
            })
    }
])


