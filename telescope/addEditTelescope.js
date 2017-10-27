var app = angular.module('StargazerDiaryAngularJsApp');
app.controller('addEditTelescopeCtrl', function($scope, $location, $routeParams, TelescopeService) {

    $scope.telescope = new Object();
    // i.e.
    // {
    //   "id" : 4,
    //   "name" : "jjjteret",
    //   "maker" : null,
    //   "model" : null,
    //   "features" : null,
    //   "telescopeType" : "REFLECTOR"
    // }
    $scope.header = 'Add a new telescope';

    if ($routeParams.id > 0) {
        $scope.header = 'Edit telescope';
        // Editing a telescope, retrieve it
        TelescopeService.getTelescope($routeParams.id).then(
            function(response){
                $scope.telescope = response.data;
            }
        )
        ;
    }

    $scope.submit = function(form){
        TelescopeService.sendTelescope($scope.telescope).then(
            function(response){
                $location.path('/telescopes')
            }
        )
        ;
    }
})