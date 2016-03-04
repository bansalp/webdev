(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $stateParams, MovieService) {
        $scope.movieId = $stateParams.movieId;

        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        if($scope.movieId)
        {
            getMovieDetailsById($scope.movieId);
        }

        function getMovieDetailsById(movieId)
        {
            MovieService.getMovieDetailsById(movieId, function(response){
                console.log(response);
                $scope.movie = response;
            });
        }
    }

})();