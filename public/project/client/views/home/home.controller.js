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

        MovieService.getGenreList(function (response) {
            var map = new Object();

            response.genres.forEach(function (element, index, array) {
                map[element.id] = element.name;
            });

            $scope.genreList = map;
        });

        if ($scope.movieTitle) {
            console.log($scope.movieTitle);
            getMoviesByTitle($scope.movieTitle);
        }
        else {
            $scope.pageHeader = "Popular Movies";
            MovieService.findPopularMovies(function (response) {
                response.results.forEach(function (element1, index1, array1) {
                    var genres = [];
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        genres.push("#" + getValue(element2));
                    });
                    element1.genres = genres;
                });

                console.log(response.results);

                $scope.movies = response.results;
            });
        }

        function getMoviesByTitle(movieTitle) {
            $scope.pageHeader = "Search Results";
            MovieService.getMoviesByTitle(movieTitle, function (response) {
                response.results.forEach(function (element1, index1, array1) {
                    var genres = [];
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        genres.push("#" + getValue(element2));
                    });
                    element1.genres = genres;
                });

                console.log(response.results);

                $scope.movies = response.results;
            });
        }

        function getValue(key) {
            return $scope.genreList[key];
        }
    }

})();