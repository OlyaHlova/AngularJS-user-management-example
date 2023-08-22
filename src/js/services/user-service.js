angular.module('exampleApp')
.factory('UserService', ['$http', function($http) {
    var users = [];

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
            return $http.put('http://localhost:3002/users/' + user.id, user)
                .then(function(response) {
                    var index = users.findIndex(u => u.id === user.id);
                    if (index !== -1) {
                        users[index] = angular.copy(user);
                    }
                    console.log('User updated successfully');
                })
                .catch(function(error) {
                    console.log('Error updating user:', error);
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
                });
        },
        addUser: function(user) {
            return $http.post('http://localhost:3002/users', user)
                .then(function(response) {
                    users.push(response.config.data);
                    console.log('User added successfully', response);
                })
                .catch(function(error) {
                    console.log('Error adding user:', error);
                });
        }
    };
}]);