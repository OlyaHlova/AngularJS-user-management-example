angular.module('exampleApp')
.factory('UserService', ['$http', '$q', function($http, $q) {
    var users = [];

    // Validation function
    function validateUser(user) {
        if (!user.userName || !user.firstName || !user.lastName || !user.email || !user.password || !user.type) {
            return $q.reject(new Error('All fields are required.'));
        }

        if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(user.password)) {
            return $q.reject(new Error('Password must be at least 8 characters long and contain at least one letter and one digit.'));
        }

        if (!/\S+@\S+\.\S+/.test(user.email)) {
            return $q.reject(new Error('Invalid email address.'));
        }

        return $q.resolve(); // Validation passed
    }

    return {
        getUsers: function() {
            return users;
        },
        setUsers: function(newUsers) {
            users = newUsers;
        },
        fetchUsers: function() {
            return $http.get('http://localhost:3002/users')
                .then(function(response) {
                    users = response.data;
                })
                .catch(function(error) {
                    console.log('Error fetching users:', error);
                });
        },
        getUser: function(userName) {
            return $http.get('http://localhost:3002/users/' + userName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.log('Error fetching user:', error);
                    throw error;
                });
        },
        updateUser: function(user) {
            return validateUser(user)
            .then(function() {
                return $http.put('http://localhost:3002/users/' + user.id, user)
                    .then(function(response) {
                        var index = users.findIndex(u => u.id === user.id);
                        if (index !== -1) {
                            users[index] = angular.copy(user);
                        }
                        console.log('User updated successfully');
                    })
                })
                .catch(function(error) {
                    console.log('Error updating user:', error);
                    throw error;
                });
        },
        deleteUser: function(id) {
            return $http.delete('http://localhost:3002/users/' + id)
                .then(function(response) {
                    var index = users.findIndex(u => u.id === id);
                    if (index !== -1) {
                        users.splice(index, 1);
                    }
                    console.log('User deleted successfully');
                })
                .catch(function(error) {
                    console.log('Error deleting user:', error);
                    throw error;
                });
        },
        addUser: function(user) {
            return validateUser(user)
                .then(function() {
                    return $http.post('http://localhost:3002/users', user)
                        .then(function(response) {
                            users.push(response.config.data);
                            console.log('User added successfully', response);
                        })
                        .catch(function(error) {
                            console.log('Error adding user:', error);
                            throw error;
                        });
                })
                .catch(function(error) {
                    return $q.reject(error);
                });
        }
    };
}]);
