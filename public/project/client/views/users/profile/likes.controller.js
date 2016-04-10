(function () {

    angular
        .module("MovieTimeApp")
        .controller("LikesController", LikesController);

    function LikesController(UserService) {
        var vm = this;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllLikedMovies(vm.user._id);
                    }
                })
                .then(function (response) {
                    var movies = response.data;
                    if (movies) {
                        vm.movies = movies;
                    }
                });
        }

        init();
    }

})();