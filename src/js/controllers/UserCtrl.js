angular.module('exampleApp')
.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    'UserService',
    function ($scope, $routeParams, UserService) {
        
        $scope.userName = $routeParams.userName;

        $scope.openForm = function(user) {
            
            $scope.user = null;
            console.log('$scope.user', $scope.user);
            // $scope.resetUserForm();
            // $scope.closeForm();
            console.log('openForm +');
            $scope.showForm = true;
            // $scope.editingUser = null;
            // $scope.user = null;
            console.log('user11', user);
            $scope.user = user;
            
            console.log('$scope.user', $scope.user);
            // $scope.user = angular.copy(user);
            $scope.editingUser = angular.copy(user);
            // $scope.user = angular.copy(user);
            console.log('$scope.user11', $scope.user);
            $scope.user = $scope.editingUser;
            
            console.log('$scope.editingUser11', $scope.editingUser);

            // Watch for changes in  $scope.user
            // $scope.$watch(function() {
            //     return  $scope.user;
            // }, function(newErrors) {
            //     console.log(' $scope.user error' );
            // });
        };

        $scope.openCreateForm = function() {
            console.log('openCreateForm +');
            $scope.showForm = true;
            $scope.user = null;
            console.log('$scope.user', $scope.user);
            // $scope.editingUser = angular.copy( $scope.user);
            // $scope.editingUser.userName = $scope.user.userName;
            // $scope.editingUser.firstName = $scope.user.firstName;
            // $scope.editingUser.lastName = $scope.user.lastName;
            // $scope.editingUser.email = $scope.user.email;
            // $scope.editingUser.type = $scope.user.type;
            // $scope.editingUser.password = $scope.user.password;
            $scope.editingUser = null;
            // console.log('user', user);
            console.log('$scope.user', $scope.user);
            console.log('$scope.editingUserr', $scope.editingUser);
        };

        // $scope.showForm = false;
        // $scope.editingUser = null;

        $scope.closeForm = function() {
            $scope.showForm = false;
            $scope.editingUser = null;
        };

        // $scope.userName = $routeParams.userName;

                 
        console.log('UserService.getUser before +');

        if ($scope.userName) {
            console.log('UserService.getUser 1 +');
            UserService.getUser($scope.userName)
                .then(function(user) {
                    
            console.log('UserService.getUser 2 +');
                    $scope.user = user;
                })
                .catch(function (error) {
                    console.log('Error fetching user data:', error);
                });
        }

        UserService.fetchUsers()
            .then(function() {         
                console.log('UserService.fetchUsers +');
                $scope.users = UserService.getUsers();
            })
            .catch(function(error) {
                console.log('Error fetching users:', error);
            });
    }
]);
