angular.module('exampleApp')
.controller('UserCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    '$location',
    function ($scope, $routeParams, $http, $location) {
        $scope.message = 'message';
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
            $scope.editingUser = null; // Reset editingUser when toggling the form
        };

        // Handle request error function
        function handleRequestError(error) {
            console.log('error', error.status);
            if (error.status === 403) {
                $location.path('/403');
            } else if (error.status === 404) {
                $location.path('/404');
            }
        }


        // Fetch users from API
        $http.get('http://localhost:3002/users')
            .then(function (response) {
                console.log('success', response.status);
                $scope.users = response.data;
            })
            .catch(handleRequestError);

        // Fetch separate user from API
        $scope.getUser = function (userName) {
            $http.get('http://localhost:3002/users/' + userName)
                .then(function (response) {
                    console.log('success init', response.data);
                    $scope.user = response.data; // Assign fetched user data to $scope.user
                })
                .catch(function (error) {
                    console.log('Error fetching user data:', error);
                    // Handle the error, such as setting $scope.user to null or showing an error message in the UI
                });
        }
        
        // Automatically fetch user data when the page initializes
        if ($routeParams.userName) {
            $scope.getUser($routeParams.userName);
        }
        
        // Add user function
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