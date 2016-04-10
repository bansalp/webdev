(function () {

    angular
        .module("MovieTimeApp")
        .controller("LikesController", LikesController);

    function LikesController($q, $stateParams, UserService, MovieService) {
        var vm = this;

        vm.likeMovie = likeMovie;
        vm.undoLikeMovie = undoLikeMovie;

        vm.navigateUserId = $stateParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return UserService.findAllLikedMovies(vm.navigateUserId);
                    }
                })
                .then(function (response) {
                    var movies = response.data;
                    if (movies) {
                        isMovieLiked(movies);
                    }
                });
        }

        init();

        function likeMovie(index) {
            var movieId = vm.movies[index]._id;
            UserService
                .likeMovie(vm.loggedInUserId, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.movies[index].isLiked = true;
                    }
                });
        }

        function undoLikeMovie(index) {
            var movieId = vm.movies[index]._id;
            UserService
                .undoLikeMovie(vm.loggedInUserId, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.movies[index].isLiked = false;
                    }
                });
        }

        function isMovieLiked(movies) {
            UserService
                .findUserById(vm.user._id)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        movies.forEach(function (element, index, array) {
                            if (vm.user.likes.indexOf(element._id) > -1) {
                                element.isLiked = true;
                            }
                            else {
                                element.isLiked = false;
                            }
                        });

                        vm.movies = movies;
                    }
                });
        }
    }

})();