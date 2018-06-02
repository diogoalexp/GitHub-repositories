(function () {
    app.service("restService", ["$http", "$q", "$location", "$window", "$localStorage",
        function ($http, $q, $location, $window, $localStorage) {
            var self = this;

            self.get = function (url, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    dataType: 'jsonp',
                    url: urlBase + url,
                    crossDomain: true,
                    headers: {
                        "Accept": 'text/json',
                        Authorization: $http.defaults.headers.common.Authorization
                    },
                    params: params
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            self.getReport = function (url, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: urlBase + url,
                    crossDomain: true,
                    headers: {
                        Authorization: $http.defaults.headers.common.Authorization
                    },
                    responseType: 'arraybuffer',
                    params: params
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            self.post = function (url, dados) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    url: urlBase + url,
                    data: dados,
                    headers: {
                        Authorization: $http.defaults.headers.common.Authorization
                    },
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            self.postFile = function (url, formData) {
                var deferred = $q.defer();
                $http({
                    url: urlBase + url,
                    method: "POST",
                    data: formData,
                    headers: {
                        'Content-Type': undefined,
                        Authorization: $http.defaults.headers.common.Authorization
                    }
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            self.handle = function (response) {
                if (response.data)
                    return response.data;
                else
                    if (response.Status)
                        return response
                    else
                        return { "Obj": {}, "Status": false, "Error": "erro: Serviço Indisponível.", "Exception": [] };
            };

            self.errorMessage = function (error) {
                if (error.status == '401') {
                    $location.path('/acesso-negado');
                } else if (error.status == '403') {

                    delete $localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = '';

                    $window.alert('Sua sessão expirou, Você será redirecionado para a página de login.');
                    $location.path('/login');
                } else {
                    $window.alert("Serviço Indisponível.");
                }
            };

            return self;
        }
    ]);

})();
