angular.module('exampleApp')
.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    'UserService',
    function ($scope, $routeParams, UserService) {
        
        $scope.userName = $routeParams.userName;

        $scope.openForm = function(user) {
            $scope.showForm = true;
            $scope.editingUser = angular.copy(user);
        };

        // $scope.updateUser = function(updatedUser) {
        //     const index = $scope.users.findIndex(u => u.id === updatedUser.id);
        //     if (index !== -1) {
        //         $scope.users[index] = angular.copy(updatedUser);
        //     }
        // };

        $scope.showForm = false;
        $scope.editingUser = null;

        $scope.toggleForm = function() {
            $scope.showForm = !$scope.showForm;
            $scope.editingUser = null;
        };

        $scope.userName = $routeParams.userName;

        if ($scope.userName) {
            UserService.getUser($scope.userName)
                .then(function(user) {
                    $scope.user = user;
                })
                .catch(function (error) {
                    console.log('Error fetching user data:', error);
                });
        }

        UserService.fetchUsers()
            .then(function() {
                $scope.users = UserService.getUsers();
            })
            .catch(function(error) {
                console.log('Error fetching users:', error);
            });

        $scope.deleteUser = function(id) {
            if (confirm("Are you sure you want to delete this user?")) {
                UserService.deleteUser(id)
                    .then(function() {
                        $scope.users = $scope.users.filter(user => user.id !== id);
                    })
                    .catch(function(error) {
                        console.log('Error deleting user:', error);
                    });
            }
        };
    }
]);
