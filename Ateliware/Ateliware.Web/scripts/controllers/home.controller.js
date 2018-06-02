(function () {
	app.controller("homeCtrl", ["$scope", "restService", "$http", "$localStorage", "$location", "$q", "$interval", "$window",
            function ($scope, restService, $http, $localStorage, $location, $q, $interval, $window) {
            	var self = $scope;

            	self.errorList = [];
            	self.index = 0;
            	self.testValue = null;

            	self.titleHome = 'Página Inicial';
            	self.usuarioValue = '';
            	self.senhaValue = '';
            	self.stateLogin = '';

            	self.GetFooter = function () {
                    self.author = author;
            	}
        
            	self.PostLogin = function () {
            		self.errorList.splice(0, self.errorList.length);
            		self.resultadoAPI = null;
            		self.stateLogin = 'searching';
            		restService.post("login/PostLogin", { "usuario": self.usuarioValue, "senha": self.senhaValue }).then(
                        function (response) {
                        	self.resultadoAPI = restService.handle(response);
                        	if (self.resultadoAPI.Status) {
                        		self.stateLogin = 'loaded';
                        		$localStorage.currentUser = { user: self.resultadoAPI.Obj, token: self.resultadoAPI.Obj.token };
                        		$http.defaults.headers.common.Authorization = 'Bearer ' + self.resultadoAPI.Obj.token;
                        		$location.path('/home');
                        	} else {
                        		self.stateLogin = 'failed';
                        		angular.forEach(response.data.Error, function (value, key) {
                        			self.errorList.push(value);
                        		});
                        	}

                        }, function (error) {
                        	self.stateLogin = 'failed';
                        	restService.errorMessage(error);
                        });
            	}

            	self.TesteLogin = function () {
            		self.errorList.splice(0, self.errorList.length);
            		self.resultadoAPI = null;
            		restService.post("login/TesteLogin", { "usuario": self.usuarioValue, "senha": self.senhaValue }).then(
                        function (response) {
                        	self.resultadoAPI = restService.handle(response);
                        	if (self.resultadoAPI.Status) {
                        		self.testValue = self.resultadoAPI.Obj;
                        		if (self.resultadoAPI.Obj == true) {
                        			alert('Autenticado!');
                        		}
                        		else
                        			alert('LOGIN NÂO AUTORIZADO!');
                        	}
                        	else {
                        		alert('ERRO NA API!');
                        	}

                        }, function (error) {
                        	restService.errorMessage(error);
                        });
            	}

            	self.Logout = function () {
            		delete $localStorage.currentUser;
            		$http.defaults.headers.common.Authorization = '';
            		self.usuarioValue = '';
            		self.senhaValue = '';
            	}

            	self.isAutenticado = function () {
            		if ($localStorage.currentUser)
            			return true;
            		return false;
            	}

            	self.gerarErro = function () {
            		self.index++;
            		self.errorList.push("erro:" + self.index);
            	}

            	self.GetUsuario = function () {
            		if (!self.isAutenticado())
            			return '';
            		if ($localStorage.currentUser.user.usuario)
            			return $localStorage.currentUser.user.usuario;
            		return '';
            	}

            	self.GetNome = function () {
            		if (!self.isAutenticado())
            			return '';
            		if ($localStorage.currentUser.user.nome)
            			return $localStorage.currentUser.user.nome;
            		if ($localStorage.currentUser.user.usuario)
            			return $localStorage.currentUser.user.usuario;
            		return '';
            	}

            	self.GetPerfil = function (perfil) {
            		var result = false;

            		if (self.isAutenticado() && $localStorage.currentUser.user.perfis != null) {
            			angular.forEach($localStorage.currentUser.user.perfis, function (value, key) {
            				if (value.nome == perfil) {
            					result = true;
            				}
            			});
            			return result;
            		}
            		else return result;
            	}
            }]);
})();