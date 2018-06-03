(function () {
	app.controller("homeCtrl", ["$scope", "restService", "$http", "$localStorage", "$location", "$q", "$interval", "$window",
            function ($scope, restService, $http, $localStorage, $location, $q, $interval, $window) {
            	var self = $scope;
                
            	self.GetFooter = function () {
                    self.author = author;
            	}        
            }]);
})();