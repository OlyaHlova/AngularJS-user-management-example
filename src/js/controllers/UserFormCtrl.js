angular.module('exampleApp')
.controller('UserFormCtrl', [
    '$scope',
    'UserService',
    function ($scope, UserService) {
        // Initialize an empty editingUser object
        // $scope.editingUser = {};

        // Add user function
        $scope.addUser = function(user) {
            UserService.addUser(user)
                .then(function(newUser) {
                    $scope.user = null;
                    // Add the new user to the displayed list
                    $scope.users.push(newUser);
                    // $scope.users = null;

                })
                .catch(function(error) {
                    console.log('Error adding user:', error);
                });
        };

        // Edit user function
        $scope.editUser = function(user) {
            // Deep copy the user object to editingUser
            $scope.editingUser = angular.copy(user);
            // Set the editingUser's id to the user's id
            $scope.editingUser.id = user.id;
        };

        // Save edited user function
        $scope.saveEditedUser = function() {
            // Make sure the form data is correctly mapped to the editingUser object
            $scope.editingUser.userName = $scope.user.userName;
            $scope.editingUser.firstName = $scope.user.firstName;
            $scope.editingUser.lastName = $scope.user.lastName;
            $scope.editingUser.email = $scope.user.email;
            $scope.editingUser.type = $scope.user.type;

            UserService.updateUser($scope.editingUser)
                .then(function() {
                    // Find the index of the edited user in the displayed list
                    const index = $scope.users.findIndex(u => u.id === $scope.editingUser.id);
                    if (index !== -1) {
                        // Update the user in the displayed list
                        $scope.users[index] = angular.copy($scope.editingUser);
                    }
                    // Clear the editingUser object
                    $scope.editingUser = {};
                    console.log('User was edited');
                })
                .catch(function(error) {
                    console.log('Error updating user:', error);
                });
        };

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