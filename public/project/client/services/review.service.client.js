(function () {

    angular
        .module("MovieTimeApp")
        .factory("ReviewService", ReviewService);


    function ReviewService($http) {
        var api = {
            findAllReviewsByMovieId: findAllReviewsByMovieId,
            movieAvgRatingByMovieId: movieAvgRatingByMovieId,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview
        };
        return api;

        function findAllReviewsByMovieId(movieId) {
            return $http.get("/api/project/movie/" + movieId + "/reviews");
        }

        function movieAvgRatingByMovieId(movieId) {
            return $http.get("/api/project/movie/" + movieId + "/avgrating");
        }

        function addReview(userId, movieId, review) {
            return $http.post("/api/project/user/" + userId + "/movie/" + movieId, review);
        }

        function updateReview(movieId, reviewId, review) {
            return $http.put("/api/project/movie/" + movieId + "/review/" + reviewId, review);
        }

        function deleteReview(movieId, reviewId) {
            return $http.delete("/api/project/movie/" + movieId + "/review/" + reviewId);
        }
    }

})();