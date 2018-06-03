(function () {
    app.controller("repositoryCtrl", ["$scope", "restService", "$http", "$localStorage", "$location", "$q", "$interval", "$window",
            function ($scope, restService, $http, $localStorage, $location, $q, $interval, $window) {
            	var self = $scope;

                self.repository = []
                self.favorite = []
                self.favoriteTotal = []
                self.detailID = null;
                self.repositoryFilter = '';
                
                self.openWindow = function (url) {
                    console.log(url);
                    $window.open(url);
                }

                self.ClearRepository = function () {
                    self.repository = []                    
                    self.favorite = []
                    self.favoriteTotal = []
                }

                self.detailsRepository = function (id) {
                    self.detailID = id;
                    $('#modalImportarSoftwares').modal({ backdrop: 'static', keyboard: false });
                    $('#modalImportarSoftwares').modal('show');
                }                

                self.removeFavorite = function (key) {
                    var data = {
                        key: key
                    };
                    restService.post('favorites/remove', data).then(
                        function (response) {
                            self.result = restService.handle(response);
                            if (self.result) {
                                alert("Record removed with success!");
                                self.favoriteTotal = self.favoriteTotal.filter(function (item) {
                                    return item.key !== data.key;
                                });
                            } else
                                alert("An unexpected error happened, please try again in a few minutes!");
                        }, function (error) {
                            alert(error);
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
                            }
                        }, function (error) {
                            alert(error);
                            self.ClearRepository();
                        });
                }

                self.LoadMore = function () {                    
                    self.result = null;
                    restService.getURL("https://api.github.com/repositories?since=" + self.repository[self.repository.length - 1].id).then(
                        function (response) {                            
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
                            }
                        }, function (error) {
                            alert(error);                         
                        });
                }

                self.FindFavorites = function () {
                    self.result = null;
                    restService.get("favorites/get").then(
                        function (response) {
                            self.ClearRepository();
                            self.result = restService.handle(response);
                            if (self.result.length > 0) {
                                angular.forEach(self.result, function (value, key) {
                                    self.favorite.push({
                                        key: value.key,
                                        id: value.id,
                                        name: value.name,
                                        language: value.language,
                                        updatedBy: value.updatedBy
                                    });
                                });
                                self.favoriteTotal = self.favorite;
                            }
                        }, function (error) {
                            alert(error);
                            self.ClearRepository();
                        });
                }
            }]);
})();