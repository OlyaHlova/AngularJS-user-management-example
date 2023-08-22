angular.module('exampleApp')
.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    'UserService',
    function ($scope, $routeParams, UserService) {
        
        $scope.userName = $routeParams.userName;
        console.log('$routeParams', $routeParams.userName);

        // Function to open the form for adding/editing users
        $scope.openForm = function(user) {
            $scope.showForm = true;
            $scope.editingUser = angular.copy(user);
        };

        // Initialize variables for form visibility and editing user
        $scope.showForm = false;
        $scope.editingUser = null;

        // Toggle form visibility
        $scope.toggleForm = function() {
            $scope.showForm = !$scope.showForm;
            $scope.editingUser = null;
        };

        $scope.userName = $routeParams.userName;

        // Fetch separate user from API
        if ($scope.userName) {
            UserService.getUser($scope.userName)
                .then(function(user) {
                    $scope.user = user;
                })
                .catch(function (error) {
                    console.log('Error fetching user data:', error);
                    // Handle the error, such as showing an error message in the UI
                });
        }

        // Fetch users from API
        UserService.fetchUsers()
            .then(function() {
                $scope.users = UserService.getUsers();
            })
            .catch(function(error) {
                console.log('Error fetching users:', error);
            });

        // Delete user function
        $scope.deleteUser = function(id) {
            if (confirm("Are you sure you want to delete this user?")) {
                UserService.deleteUser(id)
                    .then(function() {
                        // Remove the user from the displayed list
                        $scope.users = $scope.users.filter(user => user.id !== id);
                    })
                    .catch(function(error) {
                        console.log('Error deleting user:', error);
                    });
            }
        };
    }
]);