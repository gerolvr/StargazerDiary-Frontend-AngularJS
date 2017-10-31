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

myApp.value('urlRedirectionAfterLogin', { redirect: false, url: '/' } );

myApp.run(function($rootScope, $location,
        urlRedirectionAfterLogin, localStorageTokenKey, localStorageUsernameKey) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (checkLocalStorageDoesNotContainSession(localStorageTokenKey, localStorageUsernameKey)) {
        // User is not logged in, redirect to /login for any
        // location except for those authentication is not required
        if ( next.templateUrl === "home.html"
            || next.templateUrl === "login/login.html"
            || next.templateUrl === "registration/registration.html") {
        } else {
            // Save current url to redirect the user after login
            urlRedirectionAfterLogin.redirect = true;
            urlRedirectionAfterLogin.url = $location.path();
            $location.path("/login");
        }
      }
    });
 });

checkLocalStorageDoesNotContainSession = function(localStorageTokenKey, localStorageUsernameKey){
    return (localStorage.getItem(localStorageTokenKey) === null || localStorage.getItem(localStorageTokenKey).length ===0
      || localStorage.getItem(localStorageUsernameKey) === null || localStorage.getItem(localStorageUsernameKey).length ===0);
}

myApp.controller('mainCtrl', function ($scope, $rootScope, $location,
  LoginService, localStorageTokenKey, localStorageUsernameKey) {

    $rootScope.username = '';
    $rootScope.loggedIn = false;

    if(checkLocalStorageDoesNotContainSession(localStorageTokenKey,localStorageUsernameKey))
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
          // Not logged in anymore, clean up stored data bad redirect to homepage
          LoginService.onLogoutSuccess();
          $location.path('/');
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

    $scope.activeItemClass = function (item) {
        if(item === '' && $location.path() !== '/'){
            // Special case for home, otherwise the Home item
            // will always be active
            return "";
        }
        currentItem = $location.path().toLowerCase().includes(item.toLowerCase());
        return currentItem ? "active" : "";
    };
})