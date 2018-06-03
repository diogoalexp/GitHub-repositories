(function () {
    app.service("restService", ["$http", "$q", "$location", "$window", "$localStorage",
        function ($http, $q, $location, $window, $localStorage) {
            var self = this;

            self.getURL = function (url) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    dataType: 'jsonp',
                    url: url,
                    crossDomain: true,
                    //headers: {
                    //    "Accept": 'text/json',
                    //    Authorization: $http.defaults.headers.common.Authorization
                    //},
                    //params: params
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            self.get = function (url, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    dataType: 'jsonp',
                    url: urlBase + url,
                    crossDomain: true,
                    headers: {
                        "Accept": 'text/json',
                       // Authorization: $http.defaults.headers.common.Authorization
                    },
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
                    //headers: {
                    ////    Authorization: $http.defaults.headers.common.Authorization
                        
                    //},
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
                alert('Error!');
                
            };

            return self;
        }
    ]);

})();
