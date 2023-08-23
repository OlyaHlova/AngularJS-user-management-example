angular.module('exampleApp')
.directive('userFormValidation', function() {
    return {
        restrict: 'A',
        require: 'form',
        link: function(scope, element, attrs, formCtrl) {
            // Initialize passwordValidationError
            formCtrl.passwordValidationError = false;

            // Initialize serverErrors
            formCtrl.serverErrors = [];

            // Validation function
            function validatePassword(value) {
                formCtrl.passwordValidationError = !(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value));
            }

            // Watch for changes in the password field
            scope.$watch(function() {
                return formCtrl.password.$viewValue;
            }, function(value) {
                validatePassword(value);
            });

            // Watch for changes in serverErrors
            scope.$watchCollection(function() {
                return formCtrl.serverErrors;
            }, function(newErrors) {
                formCtrl.$setValidity('serverErrors', newErrors.length === 0);
            });

            // Expose the validation function for the service
            formCtrl.validateUser = function(user) {
                return validateUser(user);
            };
        }
    };
});
