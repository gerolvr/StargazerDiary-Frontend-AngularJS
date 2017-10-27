var myApp = angular.module('StargazerDiaryAngularJsApp');
// var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.service('AstrodataService', function ($http) {

    this.newSearch = function(astronomicalObjectName) {
        return $http.get('http://localhost:8080/api/v1/astrodata/search/' + astronomicalObjectName, {
            headers: {
                    'x-auth-token': localStorage.getItem('SGD_AJS_xAuthToken')
            }
        })
    }
})