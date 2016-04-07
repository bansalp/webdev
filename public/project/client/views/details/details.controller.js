(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($stateParams, $q, MovieService, ReviewService, UserService) {
        var vm = this;

        vm.movieId = parseInt($stateParams.movieId);
        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.likeMovie = likeMovie;
        vm.undoLikeMovie = undoLikeMovie;

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

            movieDetailsByMovieId(vm.movieId);
        }

        if (vm.movieId) {
            init();
        }

        function movieAvgRatingByMovieId(reviews) {
            var avgRating = 0;
            for (var i = 0; i < reviews.length; i++) {
                avgRating += parseInt(reviews[i].rating);
            }
            vm.avgRating = (avgRating / reviews.length);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
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
                        vm.reviews = response.data;
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                        isMovieLiked();
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
                        vm.reviews.push(response.data);
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
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
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.reviews[vm.selectedIndex] = review;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                    }
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(vm.movieId, reviewId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                    }
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response.data) {
                            reviews[index].userFirstName = response.data.firstName;
                        }
                    });
            });
        }

        function likeMovie() {
            UserService
                .likeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isLiked = true;
                    }
                });
        }

        function undoLikeMovie() {
            UserService
                .undoLikeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isLiked = false;
                    }
                });
        }

        function isMovieLiked() {
            UserService
                .isMovieLiked(vm.user._id, vm.movieId)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        console.log(user);
                        vm.isLiked = true;
                    }
                    else {
                        vm.isLiked = false;
                    }
                });
        }
    }

})();