var app = angular.module('mainApp');

app.controller('imageViewer', function($scope, $http) {
    $scope.tags = [];

    $http.get('data\\images.php')
        .then(function(response) {
            $scope.images = response.data.images;
        }, function(response) {
            $scope.images = 'Something went wrong';
        });

    $scope.avaiableTags = function(){
        var out = [];
        angular.forEach($scope.images, function(image) {
            angular.forEach(image.Tags, function(tag) {
                if(out.indexOf(tag) == -1)
                {
                    out.push(tag);
                }
            });
        });
        return out;
    };

    $scope.toggleTags = function(inputTag){
        if($scope.tags.indexOf(inputTag) >= 0){
            $scope.tags.pop(inputTag);
        }else{
            $scope.tags.push(inputTag);
        }
    };

    $scope.isChecked = function(inputTag){
        return $scope.tags.indexOf(inputTag) >= 0;
    };
});

app.filter('imageList', function() {
    return function (images, tags) {
        var out = [];
        angular.forEach(images, function(image) {
            angular.forEach(tags, function(tag){
                if(image.Tags.indexOf(tag) >= 0){
                    if(out.indexOf(image) == -1)
                    {
                        out.push(image);
                    }
                }
            });
        });

        return out;
    };
});