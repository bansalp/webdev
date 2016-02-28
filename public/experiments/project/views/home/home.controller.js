(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, MovieService) {

        $scope.getMovieDetailsById = getMovieDetailsById;
        $scope.getMoviesByTitle = getMoviesByTitle;

        $scope.pageHeader = "Popular Movies";
        MovieService.findPopularMovies(function (response) {
            console.log(response);
            $scope.movies = response.results;
        });

        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        function getMovieDetailsById(movieId) {
            alert(movieId);
        }

        function getMoviesByTitle(movie) {
            $scope.pageHeader = "Search Results";
            MovieService.getMoviesByTitle(movie, function(response){
                console.log(response);
                $scope.movies = response.results;
            });
        }
    }

})();