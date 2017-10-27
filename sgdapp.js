var myApp = angular.module('StargazerDiaryAngularJsApp', ["ngRoute"]);

myApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'mainCtrl',
            })
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginCtrl',
            })
            .when('/register', {
                templateUrl: 'registration/registration.html',
                controller: 'registrationCtrl',
            })
            .when('/telescopes', {
                templateUrl: 'telescope/telescopeList.html',
                controller: 'telescopeListCtrl',
            })
            .when('/addTelescope', {
                templateUrl: 'telescope/addEditTelescope.html',
                controller: 'addEditTelescopeCtrl',
            })
            .when('/editTelescope/:id', {
                templateUrl: 'telescope/addEditTelescope.html',
                controller: 'addEditTelescopeCtrl',
            })
            .when('/observations', {
                templateUrl: 'observation/observationList.html',
                controller: 'observationListCtrl',
            })
            .when('/addObservation', {
                templateUrl: 'observation/addEditObservation.html',
                controller: 'addEditObservationCtrl',
            })
            .when('/editObservation/:id', {
                templateUrl: 'observation/addEditObservation.html',
                controller: 'addEditObservationCtrl',
            })
            .when('/astrodata', {
                templateUrl: 'astronomicaldata/astrodata.html',
                controller: 'astrodataCtrl',
            })
            ;
            $locationProvider.html5Mode(true);
    }
]);

myApp.controller('mainCtrl', function ($scope, $rootScope, $location,
  LoginService, localStorageTokenKey, localStorageUsernameKey) {

    $rootScope.username = '';
    $rootScope.loggedIn = false;

    if(localStorage.getItem(localStorageTokenKey) === null || localStorage.getItem(localStorageTokenKey).length ===0
      || localStorage.getItem(localStorageUsernameKey) === null || localStorage.getItem(localStorageUsernameKey).length ===0)
    {
      // Not logged in anymore, clean up stored data
      LoginService.onLogoutSuccess();
    }
    else {
      // Is the session still active?
      LoginService.checkSession().then(
        function (response) {
          $rootScope.loggedIn = true;
          $rootScope.username = localStorage.getItem(localStorageUsernameKey);
        },
        function (error) {
          console.log('CheckSession failed');
          console.log(error);
          // Not logged in anymore, clean up stored data
          LoginService.onLogoutSuccess();
        }
      );
    }

    $scope.logout = function() {
      LoginService.logout().then(
        function(){
          LoginService.onLogoutSuccess();
          $rootScope.loggedIn = false;
          $rootScope.username = '';
          $location.path('');
        }
      );
    }
})