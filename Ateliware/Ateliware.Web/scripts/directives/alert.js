(function () {
    app.directive('alert', function () {
        return {
            restrict: 'E',
            templateUrl: '~/../scripts/directives/alert.html',
            scope: {
                alertType: '@',
                message: '@'
            },
            controller: function ($scope) {

            }
        }
    });
})();