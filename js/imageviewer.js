var app = angular.module('mainApp');

app.controller('imageViewer', function($scope, $http) {
    $scope.tags = [];

    $http.get('data\\images.php')
        .then(function(response) {
            $scope.images = response.data.images;

            angular.forEach($scope.images, function(image) {
                angular.forEach(image.Tags, function(tag) {
                    var newTag = {Name:tag, Checked:false};

                    var found = $scope.tags.some(function (el) {
                        return el.Name === newTag.Name;
                    });

                    if(!found)
                    {
                        $scope.tags.push(newTag);
                    }
                });
            });
        }, function(response) {
            $scope.images = 'Something went wrong';
        });
});

app.filter('imageList', function() {
    return function (images, tags) {
        var out = [];
        angular.forEach(tags, function(tag) {
            if(tag.Checked) {
                angular.forEach(images, function(image) {
                    angular.forEach(image.Tags, function(imagetag) {
                        if(imagetag === tag.Name)
                        {
                            if(out.indexOf(image) == -1){
                                out.push(image);
                            }

                        }
                    })
                })
            }
        });
        return out;
    };
});