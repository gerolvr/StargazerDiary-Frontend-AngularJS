var myApp = angular.module('StargazerDiaryAngularJsApp');
// var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.service('AstrodataService', function ($http, baseUrl) {

    this.newSearch = function(astronomicalObjectName) {
        return $http.get(baseUrl + '/astrodata/search/' + astronomicalObjectName, {
            headers: {
                    'x-auth-token': localStorage.getItem('SGD_AJS_xAuthToken')
            }
        })
    }
})