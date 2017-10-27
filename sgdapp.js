var myApp = angular.module('StargazerDiaryAngularJsApp',["ngRoute"]);

myApp.controller('mainCtrl', function($scope){
    $scope.username = '';
    $scope.loggedIn = false;
})