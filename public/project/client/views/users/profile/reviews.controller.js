(function () {

    angular
        .module("MovieTimeApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController(UserService, ReviewService) {
        var vm = this;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return ReviewService.findAllReviewsByUserId(vm.user._id);
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;
                    }
                });
        }

        init();
    }

})();