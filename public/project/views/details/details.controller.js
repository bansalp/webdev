(function () {

    angular
        .module("MovieTimeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $stateParams, MovieService, ReviewService) {
        $scope.movieId = $stateParams.movieId;
        $scope.addReview = addReview;

        MovieService.getImageURL(function (response) {
            $scope.imageUrl = response;
        });

        if ($scope.movieId) {
            getMovieDetailsById($scope.movieId);
            findAllReviewsByMovieId($scope.movieId);
        }

        function getMovieDetailsById(movieId) {
            MovieService.getMovieDetailsById(movieId, function (response) {
                $scope.movie = response;
            });
        }

        function findAllReviewsByMovieId(movieId) {
            ReviewService.findAllReviewsByMovieId(parseInt(movieId), function (response) {
                $scope.reviews = response;
            });
        }

        function addReview(review)
        {
            ReviewService.addReview(review, parseInt($scope.movieId), function (response) {
                findAllReviewsByMovieId($scope.movieId);
            });
        }
    }

})();