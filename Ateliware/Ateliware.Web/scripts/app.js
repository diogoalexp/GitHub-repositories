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
        .when('/searchRepository', {
            templateUrl: '~/../pages/principal/searchRepository.html',
            controller: 'repositoryCtrl as ctrl'
        })    
        .when('/favoriteRepository', {
            templateUrl: '~/../pages/principal/favoriteRepository.html',
            controller: 'repositoryCtrl as ctrl'
        })    
        .otherwise({
            redirectTo: '/'
        });
});

//app.config(function ($httpProvider) {
//    $httpProvider.defaults.headers.common = {};
//    $httpProvider.defaults.headers.post = {};
//    $httpProvider.defaults.headers.put = {};
//    $httpProvider.defaults.headers.patch = {};
//});

app.run(function ($rootScope, $http, $location, $localStorage) {
});