(function () {

    angular
        .module("MovieTimeApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($stateParams, UserService, ReviewService) {
        var vm = this;

        vm.navigateUserId = $stateParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return ReviewService.findAllReviewsByUserId(vm.navigateUserId);
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