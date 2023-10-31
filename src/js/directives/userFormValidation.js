angular.module('ValidationApp', [])
.directive('formValidation', ['UserService', '$q', function(UserService, $q) {
    return {
        restrict: 'A',
        require: 'form',
        link: function(scope, element, attrs, formCtrl) {

            formCtrl.$validators.passwordValidation = function(modelValue, viewValue) {
                var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        
                if (formCtrl.$isEmpty(modelValue)) {
                    return true; // Empty value is considered valid (leave it to the required directive)
                }

                if (passwordRegex.test(viewValue)) {
                    return true; // Password is valid
                }

                return false; // Password is invalid
            };

            formCtrl.$validators.matchingPassword = function(modelValue, viewValue) {
                var passwordValue = scope.$eval(attrs.matchPassword);
                return modelValue === passwordValue;
            };

            formCtrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                var value = modelValue || viewValue;

                if (!value) {
                    return $q.resolve(); // Empty value is considered valid
                }

                return UserService.fetchUsernames()
                    .then(function(usernames) {
                        var isUnique = !usernames.includes(value.toLowerCase());

                        if (isUnique) {
                            return $q.resolve();
                        } else {
                            return $q.reject(); // Username is not unique
                        }
                    })
                    .catch(function(error) {
                        console.log('Error fetching usernames:', error);
                        return $q.reject(); // Error, consider username not unique
                    });
            };

        }
    };
}]);