var myApp = angular.module('StargazerDiaryAngularJsApp');

myApp.service('LoginService', function ($http, baseUrl, localStorageTokenKey, localStorageUsernameKey) {

    this.sendIdentifiers = function (username, password) {
        const encodedCredentials = btoa(username + ':' + password);
        const basicHeader = 'Basic ' + encodedCredentials;
        return $http.get(baseUrl + '/user/getToken', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicHeader
            }
        })
    }

    this.sendRegistrationIdentifiers = function (identifiers) {
        return $http.post(baseUrl + '/registration/register',
            identifiers,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                transformResponse: undefined
            });
    }

    this.checkSession = function() {
        return $http.get(baseUrl + '/user/checkSession', {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey) ? localStorage.getItem(localStorageTokenKey) : ''
            },
            transformResponse: undefined
        });
    }

    this.logout = function () {
        return $http.post(baseUrl + '/user/logout', '', {
            headers: {
                'x-auth-token': localStorage.getItem(localStorageTokenKey)
            },
            transformResponse: undefined
        });
    }

    this.onLogoutSuccess = function () {
        localStorage.removeItem(localStorageTokenKey);
        localStorage.removeItem(localStorageUsernameKey);
    }
})