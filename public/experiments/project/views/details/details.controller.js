(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $routeParams, MovieService) {
        $scope.movieId = $routeParams.movieId;

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