var myApp = angular.module('StargazerDiaryAngularJsApp');
myApp.controller('addEditObservationCtrl', function ($scope, $location, $routeParams, ObservationService) {

    $scope.observation = new Object();
    $scope.header = 'Add a new observation';

    if ($routeParams.id > 0) {
        $scope.header = 'Edit observation';
        // Editing an observation, retrieve it
        ObservationService.getObservation($routeParams.id).then(
            function(response){
                $scope.observation = response.data;
            }
        )
        ;
    }

    $scope.submit = function(form){
        ObservationService.sendObservation($scope.observation).then(
            function(response){
                $location.path('/observations')
            }
        )
        ;
    }

})