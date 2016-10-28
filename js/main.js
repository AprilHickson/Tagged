var app = angular.module('mainApp', ['ngAnimate', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.htm"
        })
});