angular.module('myApp.controllers')
.controller("audioTest",['$scope', 'ngAudio', function($scope,ngAudio) {

$scope.audio = ngAudio.load("../../../audio/woosh.wav");
$scope.playSound = function() {
    $scope.audio.play();
}

}]);
