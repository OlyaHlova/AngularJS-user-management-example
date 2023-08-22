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
                templateUrl: 'views/user-view.html',
                controller: 'UserCtrl'
            })
            .when('/403', {
                template: '<h1>Error 403: Access Forbidden</h1>',
            })
            .when('/404', {
            template: '<h1>Error 404: Page Not Found</h1>',
            })
            .otherwise({
                templateUrl: 'views/errors/not-found-page.html',
            })
    }
])
