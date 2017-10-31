// var telescopeService = angular.module('telescopeServiceModule', []);
var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.service('TelescopeService', function ($http, baseUrl, localStorageTokenKey) {
    
    baseTelescopeUrl = baseUrl + '/telescopes';

    this.getTelescopeList = function () {
        return $http.get(baseTelescopeUrl + '/telescopeList', {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            }
        })
    };

    this.getTelescope = function (telescopeId){
        return $http.get(baseTelescopeUrl + '/get/' + telescopeId, {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            }
        })
    }

    this.sendTelescope = function (telescope){
        return $http.post(baseTelescopeUrl + '/saveTelescope', telescope, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            },
            transformResponse: undefined
        })
    }

    this.deleteTelescope = function (telescopeId){
        return $http.delete(baseTelescopeUrl + '/delete/' + telescopeId, {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            },
            transformResponse: undefined
        })
    }
})