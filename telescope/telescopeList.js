var app = angular.module('StargazerDiaryAngularJsApp');
app.controller('telescopeListCtrl', function ($scope, $location, TelescopeService) {
    $scope.telescopes;

    getTelescopeList = function(){
        TelescopeService.getTelescopeList().then(
            function (response) {
                $scope.telescopes = response.data;
            }
        );
    };

    getTelescopeList();

    $scope.onSelectDelete = function (telescope) {
        TelescopeService.deleteTelescope(telescope.id).then(
            function (response) {
                getTelescopeList();
            }
        );
    }

    $scope.onSelectEdit = function (telescope) {
        $location.path('/editTelescope/' + telescope.id)

    }
})