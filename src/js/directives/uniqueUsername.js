angular.module('exampleApp')
.directive('uniqueUsername', ['UserService', '$q', function(UserService, $q) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$asyncValidators.unique = function(modelValue, viewValue) {
                var value = modelValue || viewValue;

                if (!value) {
                    return $q.resolve(); // Порожнє значення вважається допустимим
                }

                return UserService.fetchUsernames()
                    .then(function(usernames) {
                        var isUnique = !usernames.includes(value.toLowerCase());

                        if (isUnique) {
                            return $q.resolve();
                        } else {
                            return $q.reject(); // Ім'я користувача не є унікальним
                        }
                    })
                    .catch(function(error) {
                        console.log('Error fetching usernames:', error);
                        return $q.reject(); // Помилка, вважаємо ім'я користувача неуникальним
                    });
            };
        }
    };
}]);
