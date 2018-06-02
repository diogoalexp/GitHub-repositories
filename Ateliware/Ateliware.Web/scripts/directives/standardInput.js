(function () {
    app
        .directive('standardInput', function () {
            return {
                restrict: 'E',
                templateUrl: '~/../scripts/directives/standardInput.html',
                scope: {
                    id: '@',
                    value: '=',
                    readonly: '=readonly',
                    label: '@',
                    placeholder: '@',
                    customize: '@',
                    type: '@',
                    colDoze: '@',
                    maxLength: '@',
                    isValid: '='
                },
                controller: function ($scope) {
                    $scope.campoValido = true;

                    $scope.$watch('isValid', function (oldValue, newValue) {
                        if (newValue != undefined) {
                            $scope.campoValido = $scope.isValid;
                        }
                    });
                }
            }
        });
})();