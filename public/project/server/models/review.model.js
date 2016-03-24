var mock = require("./review.mock.json");

module.exports = function (uuid) {
    var api = {
        findAllReviewsByMovieId: findAllReviewsByMovieId,
        movieAvgRatingByMovieId: movieAvgRatingByMovieId,
        addReview: addReview,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function findAllReviewsByMovieId(movieId) {
        var reviews = mock.filter(function (review, index, arr) {
            return (review.movieId == movieId);
        });
        return reviews;
    }

    function movieAvgRatingByMovieId(movieId) {
        var reviews = findAllReviewsByMovieId(movieId);
        var avgRating = 0;
        for (var i = 0; i < reviews.length; i++) {
            avgRating += reviews[i].rating;
        }
        return (avgRating / reviews.length);
    }

    function addReview(userId, movieId, review) {
        review._id = uuid.v4();
        review.userId = userId;
        review.movieId = movieId;
        review.timestamp = new Date();
        mock.push(review);
        var reviews = findAllReviewsByMovieId(movieId);
        return reviews;
    }

    function updateReview(movieId, reviewId, review) {
        review.timestamp = new Date();
        for (var r in mock) {
            if (mock[r]._id == reviewId) {
                mock[r] = review;
                var reviews = findAllReviewsByMovieId(movieId);
                return reviews;
            }
        }
        return null;
    }

    function deleteReview(movieId, reviewId) {
        var index = findIndexByReviewId(reviewId);
        mock.splice(index, 1);
        var reviews = findAllReviewsByMovieId(movieId);
        return reviews;
    }

    function findIndexByReviewId(reviewId) {
        var index = 0;
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id == reviewId) {
                return index;
            }
            index++;
        }
    }
}