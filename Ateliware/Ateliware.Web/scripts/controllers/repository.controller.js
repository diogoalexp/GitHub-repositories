(function () {
    app.controller("repositoryCtrl", ["$scope", "restService", "$http", "$localStorage", "$location", "$q", "$interval", "$window",
            function ($scope, restService, $http, $localStorage, $location, $q, $interval, $window) {
            	var self = $scope;

                self.title = 'Search Repositories';

            	self.errorList = [];
            	self.index = 0;
            	self.testValue = null;

            	self.usuarioValue = '';
            	self.senhaValue = '';
                self.stateLogin = '';
                self.repository = []
                self.repositoryTotal = []
                self.detailID = null;
                self.openWindow = function (url) {
                    console.log(url);
                    $window.open(url);
                }

                self.ClearRepository = function () {
                    self.repository = []
                    self.repositoryTotal = []
                }

                self.detailsRepository = function (id) {
                    self.detailID = id;
                    $('#modalImportarSoftwares').modal({ backdrop: 'static', keyboard: false });
                    $('#modalImportarSoftwares').modal('show');

                }


                self.FindReposity = function () {
                    self.stateEdificio = 'searching';
                    self.errorList.splice(0, self.errorList.length);
                    self.result = null;
                    restService.getURL("https://api.github.com/repositories").then(
                        function (response) {
                            self.ClearRepository();
                            self.result = restService.handle(response);
                            if (self.result.length > 0) {
                                self.errorList = [];
                                angular.forEach(self.result, function (value, key) {
                                    self.repository.push({
                                        id: value.id,
                                        name: value.name,
                                        path: value.full_name,
                                        pathUrl: value.html_url,
                                        description: value.description,
                                        private: value.private,
                                        login: value.owner.login,
                                        loginUrl: value.owner.html_url,
                                        language: value.language
                                    });
                                });
                                self.repositoryTotal = self.repository;
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
            }]);
})();