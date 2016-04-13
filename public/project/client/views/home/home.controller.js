(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($stateParams, MovieService) {
        var vm = this;

        vm.getMoviesByTitle = getMoviesByTitle;

        vm.movieTitle = $stateParams.movieTitle;

        function init() {
            vm.imageUrl = MovieService.getImageURL();

            MovieService
                .getGenreList()
                .then(function (response) {
                    var map = new Object();
                    response.data.genres.forEach(function (element, index, array) {
                        map[element.id] = element.name;
                    });
                    vm.genreList = map;
                });

            if (vm.movieTitle) {
                getMoviesByTitle(vm.movieTitle);
            }
            else {
                vm.pageHeader = "Popular Movies";

                MovieService
                    .findPopularMovies()
                    .then(function (response) {
                        response.data.results.forEach(function (element1, index1, array1) {
                            var genres = [];
                            element1.genre_ids.forEach(function (element2, index2, array2) {
                                genres.push("#" + getValue(element2));
                            });
                            element1.genres = genres;
                        });

                        vm.movies = response.data.results;
                    });
            }
        }

        init();

        function getMoviesByTitle(movieTitle) {
            vm.pageHeader = "Search Results";

            MovieService
                .getMoviesByTitle(movieTitle)
                .then(function (response) {
                    response.data.results.forEach(function (element1, index1, array1) {
                        var genres = [];
                        element1.genre_ids.forEach(function (element2, index2, array2) {
                            genres.push("#" + getValue(element2));
                        });
                        element1.genres = genres;
                    });

                    vm.movies = response.data.results;
                });
        }

        function getValue(key) {
            return vm.genreList[key];
        }
    }

})();