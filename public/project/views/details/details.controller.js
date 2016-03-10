(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $stateParams, MovieService, ReviewService) {
        $scope.movieId = parseInt($stateParams.movieId);
        $scope.addReview = addReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;

        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        if ($scope.movieId) {
            init();
        }

        function init()
        {
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

        function addReview(review)
        {
            ReviewService.addReview(review, $scope.movieId, function (response) {
                $scope.selectedIndex = -1;
                $scope.review = {};
                findAllReviewsByMovieId($scope.movieId);
            });
        }

        function selectReview(index)
        {
            var selectedReview = {
                "_id": $scope.reviews[index]["_id"],
                "title": $scope.reviews[index]["title"],
                "description": $scope.reviews[index]["description"],
                "timestamp": $scope.reviews[index]["timestamp"],
                "movieId": $scope.reviews[index]["movieId"],
                "userId": $scope.reviews[index]["userId"],
                "commentIds": $scope.reviews[index]["commentIds"]
            };

            $scope.selectedIndex = index;
            $scope.review = selectedReview;
        }

        function updateReview(review)
        {
            ReviewService.updateReview(review, function(newReview) {
                $scope.reviews[$scope.selectedIndex] = newReview;
                $scope.selectedIndex = -1;
                $scope.review = {};
            });
        }
    }

})();