(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $stateParams, MovieService) {
        $scope.getMoviesByTitle = getMoviesByTitle;

        $scope.movieTitle = $stateParams.movieTitle;
        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        if ($scope.movieTitle) {
            console.log($scope.movieTitle);
            getMoviesByTitle($scope.movieTitle);
        }
        else {
            $scope.pageHeader = "Popular Movies";
            MovieService.findPopularMovies(function (response) {
                console.log(response);
                $scope.movies = response.results;
            });
        }

        function getMoviesByTitle(movieTitle) {
            $scope.pageHeader = "Search Results";
            MovieService.getMoviesByTitle(movieTitle, function (response) {
                console.log(response);
                $scope.movies = response.results;
            });
        }
    }

})();