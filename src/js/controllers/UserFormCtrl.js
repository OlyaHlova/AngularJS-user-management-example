angular.module('exampleApp')
.controller('UserFormCtrl', [
    '$scope',
    'UserService',
    function ($scope, UserService) {

        // Initialize passwordValidationError
        $scope.passwordValidationError = false;

        // Initialize serverErrors
        $scope.serverErrors = [];

        function resetFormErrors() {
            $scope.passwordValidationError = false;
            $scope.serverErrors = [];
        }

        function resetUserForm() {
            $scope.user = null;
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
        }

        $scope.$watch('passwordValidationError', function(newVal) {
            if (newVal) {
                $scope.userForm.password.$setValidity('passwordValidation', false);
            } else {
                $scope.userForm.password.$setValidity('passwordValidation', true);
            }
        });

        $scope.addUser = function(user) {
            if ($scope.passwordValidationError || $scope.serverErrors.length > 0) {
                return;
            }

            UserService.addUser(user)
                .then(function(newUser) {      
                    resetUserForm();
                    $scope.users.push(newUser);
                    resetFormErrors();
                })
                .catch(function(error) {
                    console.log('Error adding user:', error);
                    if (error.data && error.data.errors) {
                        $scope.serverErrors = error.data.errors;
                    }
                });
        };

        $scope.editUser = function(user) {
            $scope.editingUser = angular.copy(user);
            $scope.editingUser.id = user.id;
        };

        $scope.saveEditedUser = function() {
            if (!$scope.user){
                return
            }

            if ($scope.passwordValidationError || $scope.serverErrors.length > 0) {
                return;
            }

            $scope.editingUser.userName = $scope.user.userName;
            $scope.editingUser.firstName = $scope.user.firstName;
            $scope.editingUser.lastName = $scope.user.lastName;
            $scope.editingUser.email = $scope.user.email;
            $scope.editingUser.type = $scope.user.type;
            $scope.editingUser.password = $scope.user.password;

            UserService.updateUser($scope.editingUser)
                .then(function() {
                    // Find the index of the edited user in the displayed list
                    const index = $scope.users.findIndex(u => u.id === $scope.editingUser.id);
                    if (index !== -1) {
                        // Update the user in the displayed list
                        $scope.users[index] = angular.copy($scope.editingUser);
                    }
                    // $scope.updateUser($scope.editingUser);
                    // $scope.editingUser = {};
                    resetUserForm();
                    resetFormErrors();
                    console.log('User was edited');
                })
                .catch(function(error) {
                    console.log('Error updating user:', error);
                    if (error.data && error.data.errors) {
                        $scope.serverErrors = error.data.errors;
                    }
                });
        };

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
