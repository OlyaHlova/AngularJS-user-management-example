angular.module('exampleApp')
.controller('UserFormCtrl', [
    '$scope',
    'UserService',
    function ($scope, UserService) {

        // Initialize passwordValidationError
        $scope.passwordValidationError = false;

        // Initialize serverErrors
        $scope.serverErrors = [];
        
        // Initialize successMessage
        $scope.successMessage = '';
        // $scope.successMessage = '111';
        $scope.errorMessage = '';
        // $scope.errorMessage = '1000';

        function resetFormErrors() {
            $scope.passwordValidationError = false;
            $scope.serverErrors = [];
            $scope.successMessage = '';
            $scope.errorMessage = '';
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
                    $scope.successMessage = 'User added successfully.';
                })
                .catch(function(error) {
                    console.log('Error adding user:', error);
                    if (error.data && error.data.errors) {
                        $scope.serverErrors = error.data.errors;
                    }
                    $scope.errorMessage = 'error Message';
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
                    const index = $scope.users.findIndex(u => u.id === $scope.editingUser.id);
                    if (index !== -1) {
                        $scope.users[index] = angular.copy($scope.editingUser);
                    }
                    resetUserForm();
                    resetFormErrors();
                    console.log('User was edited');
                    $scope.successMessage = 'User updated successfully.';
                })
                .catch(function(error) {
                    console.log('Error updating user:', error);
                    if (error.data && error.data.errors) {
                        $scope.serverErrors = error.data.errors;
                    }
                    $scope.errorMessage = 'error Message';
                });
        };

        $scope.deleteUser = function(id) {
            if (confirm("Are you sure you want to delete this user?")) {
                UserService.deleteUser(id)
                    .then(function() {
                        resetFormErrors;
                        $scope.users = $scope.users.filter(user => user.id !== id);
                        $scope.successMessage = 'User deleted successfully.';
                    })
                    .catch(function(error) {
                        console.log('Error deleting user:', error);
                        $scope.errorMessage = 'error Message';
                    });
            }
        };
    }
]);
