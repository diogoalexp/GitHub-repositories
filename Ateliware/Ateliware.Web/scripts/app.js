var app = angular.module("myApp", [
    'ngAnimate',
    'ngRoute',
    'ngStorage',
    'ngMessages',
    'ui.bootstrap'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl: '~/../pages/principal/home.html',
            controller: 'homeCtrl as ctrl'
        })
        .when('/login', {
            templateUrl: '~/../pages/principal/login.html',
            controller: 'homeCtrl as ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function ($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;

        if (restrictedPage && !$localStorage.currentUser && !$location.path().includes('/home')) {
            $location.path('/login');
        }
    });
});