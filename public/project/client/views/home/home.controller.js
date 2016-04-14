(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomeController", HomeController);

    function HomeController($stateParams, $interval, MovieService) {
        var vm = this;

        vm.getMoviesByTitle = getMoviesByTitle;

        vm.slide = function (dir) {
            $('#myCarousel').carousel(dir);
        };

        vm.movieTitle = $stateParams.movieTitle;

        var slides = [];

        function init() {
            $('#myCarousel').carousel({
                interval: 5000
            });

            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);

            MovieService
                .findUpcomingMovies()
                .then(function (response) {
                    response.data.results.forEach(function (element1, index1, array1) {
                        if (element1.backdrop_path) {
                            element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                            slides.push(element1);
                        }
                    });
                });

            vm.slides = slides;

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
                    .then(
                        function (response) {
                            var movies = preprocessResponse(response);
                            if (movies.length != 0) {
                                vm.movies = movies;
                                vm.error = null;
                            }
                            else {
                                vm.error = "Change a few things up and try submitting again.";
                            }
                        },
                        function (err) {
                            vm.error = "Change a few things up and try submitting again.";
                        });
            }
        }

        init();

        function getMoviesByTitle(movieTitle) {
            vm.pageHeader = "Search Results";

            MovieService
                .getMoviesByTitle(movieTitle)
                .then(
                    function (response) {
                        var movies = preprocessResponse(response);
                        if (movies.length != 0) {
                            vm.movies = movies;
                            vm.error = null;
                        }
                        else {
                            vm.error = "Change a few things up and try submitting again.";
                        }
                    },
                    function (err) {
                        vm.error = "Change a few things up and try submitting again.";
                    });
        }

        function preprocessResponse(response) {
            response.data.results.forEach(function (element1, index1, array1) {
                var genres = [];
                if (element1.genre_ids.length != 0) {
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        genres.push("#" + getValue(element2));
                    });
                }
                else {
                    genres.push("#NA");
                }
                element1.genres = genres;

                if (element1.backdrop_path) {
                    element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                }
                else {
                    element1.imageUrl = "/project/client/images/Image-Not-Available.jpg";
                }

                if (!element1.overview) {
                    element1.overview = "There is no overview for this movie.";
                }
            });

            return response.data.results;
        }

        function getValue(key) {
            return vm.genreList[key];
        }
    }

})();