var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.controller('registrationCtrl', function($scope, $rootScope,
    LoginService, localStorageTokenKey, localStorageUsernameKey){

    $scope.identifiers = new Object();
    $scope.registrationSuccessMessage;
    $scope.registrationFailedMessage;

    // Registration successful, attempt auto-login and
    // set the keys in the local storage
    $scope.onRegistrationSuccess = function(){
        LoginService.sendIdentifiers(
            $scope.identifiers.name, $scope.identifiers.password)
            .then(response => {
                localStorage.setItem(localStorageTokenKey, response.data.token);
                localStorage.setItem(localStorageUsernameKey, $scope.identifiers.name);
                $rootScope.loggedIn = true;
                $rootScope.username = $scope.identifiers.name;
                $scope.registrationSuccessMessage = 'Thanks for registering. Your are now logged in.';
            },
            loginerr => {
                console.log(loginerr);
                this.registrationFailedMessage = loginerr.data;
            });
    }

    $scope.submit = function(){
        LoginService.sendRegistrationIdentifiers($scope.identifiers).then(
            function(success){
                $scope.registrationFailedMessage = null;
                $scope.onRegistrationSuccess();
            },
            function(error){
                // Registration failed, i.e. username already in use
                $scope.registrationSuccessMessage = null;
                $scope.registrationFailedMessage = error.data;
            }
        );
    }
})