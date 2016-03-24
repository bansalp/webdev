(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($stateParams, MovieService, ReviewService, UserService) {
        var vm = this;

        vm.movieId = parseInt($stateParams.movieId);
        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        //vm.findUserFirstNameByUserId = findUserFirstNameByUserId;

        vm.review = {
            "rating": 0,
            "title": "",
            "description": ""
        };

        MovieService.getImageURL(function (response) {
            vm.imageUrl = response;
        });

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                    }
                });

            movieAvgRatingByMovieId(vm.movieId);
            movieDetailsByMovieId(vm.movieId);
        }

        if (vm.movieId) {
            init();
        }

        function movieAvgRatingByMovieId(movieId) {
            ReviewService
                .movieAvgRatingByMovieId(movieId)
                .then(function (response) {
                    if (response.data) {
                        vm.avgRating = response.data;
                    }
                });
        }

        function movieDetailsByMovieId(movieId) {
            MovieService.getMovieDetailsById(movieId, function (response) {
                vm.movie = response;
                findAllReviewsByMovieId(movieId);
            });
        }

        function findAllReviewsByMovieId(movieId) {
            ReviewService
                .findAllReviewsByMovieId(movieId)
                .then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        vm.reviews = response.data;
                    }
                });
        }

        function addReview(review) {
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findAllReviewsByMovieId(vm.movieId);
                        movieAvgRatingByMovieId(vm.movieId);
                    }
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "_id": vm.reviews[index]["_id"],
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "timestamp": vm.reviews[index]["timestamp"],
                "movieId": vm.reviews[index]["movieId"],
                "userId": vm.reviews[index]["userId"],
                "rating": vm.reviews[index]["rating"]
            }
            vm.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(vm.movieId, review._id, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findAllReviewsByMovieId(vm.movieId);
                        movieAvgRatingByMovieId(vm.movieId);
                    }
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(vm.movieId, reviewId)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findAllReviewsByMovieId(vm.movieId);
                        movieAvgRatingByMovieId(vm.movieId);
                    }
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }
    }

})();