var app = angular.module('StargazerDiaryAngularJsApp');
app.controller('observationListCtrl', function($scope, ObservationService){

    $scope.observations;

    getObservationList = function () {
        ObservationService.getObservationList().then(
            function (response) {
                $scope.observations = response.data;
            }
        )
    }

    getObservationList();

    $scope.onSelectDelete = function (observation){
        ObservationService.deleteObservation(observation.id).then(
            function(response){
                getObservationList();
            }
        );
    }
})