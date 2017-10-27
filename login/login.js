var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.controller('loginCtrl', function($scope, $rootScope, $http, $location,
    LoginService, localStorageTokenKey, localStorageUsernameKey, urlRedirectionAfterLogin){

    $rootScope.loggedIn = false;
    $rootScope.username = '';
    $scope.identifiers = new Object();
    $scope.authenticationFailed

    $scope.submit = function(form){
        LoginService.sendIdentifiers($scope.identifiers.username, $scope.identifiers.password).
            then(function (response) {
                localStorage.setItem(localStorageTokenKey, response.data.token);
                localStorage.setItem(localStorageUsernameKey, $scope.identifiers.username);
                $rootScope.loggedIn = true;
                $rootScope.username = $scope.identifiers.username;
                $scope.authenticationFailed = false;
                if(urlRedirectionAfterLogin.redirect) {
                    urlRedirectionAfterLogin.redirect = false;
                    $location.path(urlRedirectionAfterLogin.url);    
                } else {
                    $location.path('/');
                }
            }, function (error){
                $scope.authenticationFailed = true;
            }
        );
	};
  })