var myApp = angular.module('StargazerDiaryAngularJsApp');

// Required for links in iframe (i.e. planetarium and optical view)
myApp.filter('trustedUrl', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

myApp.controller('astrodataCtrl', function($scope, AstrodataService){
    
    $scope.astroDataSearchResult = new Object();
    $scope.astroObjectName;
    $scope.searchedAstroObjectName;
    $scope.searchComplete=false;
    $scope.searchStarted=false;
    $scope.searchCompletedSuccessfully=false;
    $scope.astroObjectNotFound = false;

    $scope.search = function(search) {
        $scope.searchStarted=true;
        $scope.astroObjectNotFound = false;
        $scope.astroObjectName = search;
        $scope.searchedAstroObjectName = search;
        AstrodataService.newSearch(search).then(
            function(result){
                $scope.searchStarted=false;
                $scope.searchComplete=true;
                $scope.astroDataSearchResult = result.data;
                if (!$scope.astroDataSearchResult.found) {
                    $scope.astroDataSearchResult = null;
                    $scope.astroObjectNotFound = true;
                    $scope.searchCompletedSuccessfully=false;
                } else {
                    $scope.searchCompletedSuccessfully=true;
                    $scope.astroObjectNotFound = false;
                }
                
            },
            function(error){

            }
        )
    }
})