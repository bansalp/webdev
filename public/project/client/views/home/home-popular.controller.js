(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomePopularController", HomePopularController);

    function HomePopularController($scope, MovieService) {
        var vm = this;

        vm.myPagingFunction = myPagingFunction;

        function init() {
            vm.paginationCounter = 1;

            MovieService
                .getGenreList()
                .then(function (response) {
                    var map = new Object();
                    response.data.genres.forEach(function (element, index, array) {
                        map[element.id] = element.name;
                    });
                    vm.genreList = map;
                });

            MovieService
                .findPopularMovies(vm.paginationCounter)
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

        init();

        function myPagingFunction() {
            if (vm.paginationCounter == 1) {
                vm.paginationCounter = vm.paginationCounter + 1;
            }
            else {
                vm.busy = true;
                MovieService
                    .findPopularMovies(vm.paginationCounter)
                    .then(
                        function (response) {
                            var movies = preprocessResponse(response);
                            if (movies.length != 0) {
                                vm.movies.push.apply(vm.movies, movies);
                                vm.busy = false;
                            }
                        });
            }
        }

        function preprocessResponse(response) {
            response.data.results.forEach(function (element1, index1, array1) {
                var genres = [];
                if (element1.genre_ids.length != 0 && element1.genre_ids) {
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        genres.push("#" + getValue(element2));
                    });
                }
                else {
                    genres.push("#NA");
                }
                element1.genres = genres;

                if (element1.backdrop_path) {
                    element1.imageUrl = $scope.homeControllerModel.imageUrl + element1.backdrop_path;
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