(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $stateParams, MovieService, ReviewService, UserService) {
        $scope.movieId = parseInt($stateParams.movieId);
        $scope.addReview = addReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;
        $scope.cancelReview = cancelReview;
        $scope.findUserFirstNameByUserId = findUserFirstNameByUserId;

        $scope.review = {
            "rating": 0,
            "title": "",
            "description": ""
        };

        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        if ($scope.movieId) {
            init();
        }

        function init() {
            getMovieDetailsById($scope.movieId);
        }

        function getMovieDetailsById(movieId) {
            MovieService.getMovieDetailsById(movieId, function (response) {
                $scope.movie = response;
                findAllReviewsByMovieId(movieId);
            });
        }

        function findAllReviewsByMovieId(movieId) {
            ReviewService.findAllReviewsByMovieId(movieId, function (response) {
                $scope.reviews = response;
            });
        }

        function addReview(review) {
            ReviewService.addReview(review, $scope.movieId, function () {
                $scope.selectedIndex = -1;
                $scope.review = {};
                findAllReviewsByMovieId($scope.movieId);
            });
        }

        function selectReview(index) {
            $scope.selectedIndex = index;
            var editReview = {
                "_id": $scope.reviews[index]["_id"],
                "title": $scope.reviews[index]["title"],
                "description": $scope.reviews[index]["description"],
                "timestamp": $scope.reviews[index]["timestamp"],
                "movieId": $scope.reviews[index]["movieId"],
                "userId": $scope.reviews[index]["userId"],
                "rating": $scope.reviews[index]["rating"],
                "commentIds": $scope.reviews[index]["commentIds"]
            }
            $scope.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService.updateReview(review, function (newReview) {
                $scope.reviews[$scope.selectedIndex] = newReview;
                $scope.selectedIndex = -1;
                $scope.review = {};
            });
        }

        function deleteReview(index) {
            var reviewId = $scope.reviews[index]._id;
            ReviewService.deleteReview(reviewId, function () {
                $scope.selectedIndex = -1;
                $scope.review = {};
                findAllReviewsByMovieId($scope.movieId);
            });
        }

        function cancelReview() {
            $scope.selectedIndex = -1;
        }

        function findUserFirstNameByUserId(userId) {
            var userFirstName;
            UserService.findUserFirstNameByUserId(userId, function (response) {
                userFirstName = response;
            });

            return userFirstName;
        }
    }

})();