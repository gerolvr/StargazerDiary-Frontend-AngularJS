// var observationService=angular.module('observationServiceModule', []);
var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.service('ObservationService', function($http, baseUrl, localStorageTokenKey){

    baseObservationUrl = baseUrl + '/observations';

    this.getObservationList = function () {
        return $http.get(baseObservationUrl + '/observationList', {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            }
        })
    };

    this.getObservation = function (observationId){
        return $http.get(baseObservationUrl + '/get/' + observationId, {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            }
        })
    }

    this.sendObservation = function (observation){
        return $http.post(baseObservationUrl + '/saveObservation', observation, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            },
            transformResponse: undefined
        })
    }

    this.deleteObservation = function (observationId){
        return $http.get(baseObservationUrl + '/delete/' + observationId, {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            },
            transformResponse: undefined
        })
    }
    }
)