(function () {
    app.directive('detailsModal', function () {
        return {
            restrict: 'E',
            templateUrl: '~/../scripts/directives/detailsModal.html',
            scope: {
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
                    self.details = null;
                    restService.getURL("https://api.github.com/repositories/" + id).then(
                        function (response) {                            
                            self.details = restService.handle(response);
                            if (self.details) {
                                self.FindUser(self.details.owner.url);
                            } else {
                                alert("Details not found.");
                            }
                        }, function (error) {
                            alert(error);
                        });
                }

                self.FindUser = function (url) {
                    if ((url == null) || (url == undefined))
                        return;                    
                    self.user = null;
                    restService.getURL(url).then(
                        function (response) {
                            self.user = restService.handle(response);
                        }, function (error) {
                            alert(error);
                        });
                }

                self.addFavorite = function (id, name, language) {
                    var data = {
                        id: id,
                        name: name,
                        language: language
                    };
                    restService.post('favorites/add', data).then(
                        function (response) {
                            self.result = restService.handle(response);
                            alert(self.result);
                        }, function (error) {
                            alert(error);
                        });
                }

            }
        }
    });
})();