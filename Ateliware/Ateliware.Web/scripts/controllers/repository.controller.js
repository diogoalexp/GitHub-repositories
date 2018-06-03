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

                self.favoriteRepository = function (id) {
                    var data = {
                        id: id
                    };

                    restService.post('favorites/add', data).then(
                        function (response) {
                            self.result = restService.handle(response);
                            if (self.result.Status) {
                                console.log('Alteração efetuada com sucesso.');
                            } else {
                                angular.forEach(response.data.Error, function (value, key) {
                                    $window.alert(value);
                                });

                                $('#ckb' + softwareId + 'Ativo').prop('checked', 'checked');
                            }
                        }, function (error) {
                            if (error != null) {
                                restService.errorMessage(error);
                            } else {
                                $window.alert("Serviço Indisponível.");
                            }
                        });
                }


                self.selectLanguage = function (languages_url) {
                    restService.getURL(languages_url).then(
                        function (response) {
                            self.languageList = restService.handle(response);
                            if (self.result.length > 0)
                                return self.languageList;
                            else
                                return [];
                        }, function (error) {
                            //alert("Serviço Indisponível.");                            
                        });
                }

                self.FindReposity = function () {                                        
                    self.result = null;
                    restService.getURL("https://api.github.com/repositories").then(
                        function (response) {
                            self.ClearRepository();
                            self.result = restService.handle(response);
                            if (self.result.length > 0) {                                
                                angular.forEach(self.result, function (value, key) {
                                    self.repository.push({
                                        id: value.id,
                                        name: value.name,
                                        path: value.full_name,
                                        pathUrl: value.html_url,
                                        description: value.description,
                                        private: value.private,
                                        login: value.owner.login,
                                        loginUrl: value.owner.html_url
                                    });
                                });
                                self.repositoryTotal = self.repository;
                            }
                        }, function (error) {
                            alert("Serviço Indisponível.");
                            self.ClearRepository();
                        });
                }
            }]);
})();