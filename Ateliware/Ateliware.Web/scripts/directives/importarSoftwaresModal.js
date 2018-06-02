(function () {
    app.directive('importarSoftwaresModal', function () {
        return {
            restrict: 'E',
            templateUrl: '~/../scripts/directives/importarSoftwaresModal.html',
            scope: {
                stateCadastro: '=',
                detailId: '='
            },
            controller: function ($scope, restService, $window, $localStorage) {
                var self = $scope;

                self.$watch('detailId', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        self.FindDetails(newValue);
                    }
                });

                self.FindDetails = function (id) {
                    if ((id == null) || (id == undefined))
                        return;
                    self.stateEdificio = 'searching';                    
                    self.result = null;
                    restService.getURL("https://api.github.com/repositories/" + id).then(
                        function (response) {                            
                            self.result = restService.handle(response);
                            if (self.result) {
                                self.FindUser(self.result.owner.url);
                            } else {
                                self.errorList = [];
                            }
                            window.setTimeout(function () {
                                $scope.$apply(function () {
                                    self.stateEdificio = 'loaded'
                                });
                            }, 500);
                        }, function (error) {
                            self.stateEdificio = 'failed';
                            if (error != null) {
                                restService.errorMessage(error);
                            } else {
                                alert("Serviço Indisponível.");
                            }
                        });
                }

                self.FindUser = function (url) {
                    if ((url == null) || (url == undefined))
                        return;
                    self.stateEdificio = 'searching';
                    self.user = null;
                    restService.getURL(url).then(
                        function (response) {
                            self.user = restService.handle(response);

                        }, function (error) {
                            alert('Error!');
                        });
                }

            }
        }
    });
})();