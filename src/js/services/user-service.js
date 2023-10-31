angular.module('exampleApp')
.factory('UserService', ['$http', '$q', function($http, $q) {
    var users = [];
    var usernames = []; // Array to cache usernames
    
    function fetchUsers() {
        return $http.get('http://localhost:3002/users')
            .then(function(response) {
                users = response.data;
                usernames = users.map(function(user) {
                    return user.userName;
                });
            })
            .catch(function(error) {
                console.log('Error fetching users:', error);
            });
    }
    
    return {
        getUsers: function() {
            return users;
        },
        setUsers: function(newUsers) {
            users = newUsers;
            usernames = newUsers.map(function(user) {
                return user.userName;
            });
        },
        fetchUsers: function() {
            if (users.length === 0) {
                return fetchUsers();
            } else {
                return $q.resolve();
            }
        },
        getUsernames: function() {
            return usernames;
        },
        fetchUsernames: function() {
            if (usernames.length === 0) {
                return fetchUsers()
                    .then(function() {
                        return $q.resolve();
                    });
            } else {
                return $q.resolve();
            }
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
            // return userFormValidation.validateUser(user)
            //     .then(function() {
                    return $http.put('http://localhost:3002/users/' + user.id, user)
                        .then(function(response) {
                            var index = users.findIndex(u => u.id === user.id);
                            if (index !== -1) {
                                users[index] = angular.copy(user);
                            }
                            console.log('User updated successfully');
                        })
                    // })
                        // .catch(function(error) {
                        //     console.log('Error updating user:', error);
                        //     throw error;
                        // });
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
            // return userFormValidation.validateUser(user)
                // .then(function() {
                    return $http.post('http://localhost:3002/users', user)
                        .then(function(response) {
                            users.push(response.config.data);
                            console.log('User added successfully', response);
                        })
                        .catch(function(error) {
                            console.log('Error adding user:', error);
                            throw error;
                        });
                // })
                // .catch(function(error) {
                //     return $q.reject(error);
                // });
        }
    };
}]);
