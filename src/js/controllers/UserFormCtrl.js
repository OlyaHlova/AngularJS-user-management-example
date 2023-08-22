angular.module('exampleApp')
.controller('UserFormCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.addUser = function (user) {
            console.log("user", user);
            $http.post('http://localhost:3002/users', user)
                .then(function (result) {
                    console.log('success SAVED', result);
                    $scope.users.push(user);
                    $scope.user = null;
                })
                .catch(handleRequestError);
        }

        // Edit user function
        $scope.editUser = function (user) {
            $scope.editingUser = angular.copy(user);
        };

        // Save edited user function
        $scope.saveEditedUser = function () {
            $http.put('http://localhost:3002/users/' + $scope.editingUser.id, $scope.editingUser)
                .then(function (response) {
                    console.log('User updated successfully');
                    const index = $scope.users.findIndex(u => u.id === $scope.editingUser.id);
                    if (index !== -1) {
                        $scope.users[index] = angular.copy($scope.editingUser);
                    }
                    $scope.editingUser = null;
                })
                .catch(function (error) {
                    console.log('Error updating user:', error);
                });
        };

        // Delete user function
        $scope.deleteUser = function (id) {
            if (confirm("Are you sure you want to delete this user?")) {
                $http.delete('http://localhost:3002/users/' + id)
                    .then(function (response) {
                        console.log('User deleted successfully');
                        const index = $scope.users.findIndex(u => u.id === id);
                        if (index !== -1) {
                            $scope.users.splice(index, 1);
                            $scope.showForm = false; // Close the form after deletion
                        }
                    })
                    .catch(function (error) {
                        console.log('Error deleting user:', error);
                    });
            }
        };
    }
]);