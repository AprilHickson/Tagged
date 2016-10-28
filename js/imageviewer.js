var app = angular.module('mainApp');

app.controller('imageViewer', function($scope, $http) {
    $http.get('data\\images.php')
        .then(function(response) {
            $scope.images = response.data.images;
        }, function(response) {
            $scope.images = 'Something went wrong';
        });
});