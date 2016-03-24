"use strict";
module.exports = function (app, model) {
    app.get("/api/project/movie/:movieId/reviews", findAllReviewsByMovieId);
    app.get("/api/project/movie/:movieId/avgrating", movieAvgRatingByMovieId);
    app.post("/api/project/user/:userId/movie/:movieId", addReview);
    app.put("/api/project/movie/:movieId/review/:reviewId", updateReview);
    app.delete("/api/project/movie/:movieId/review/:reviewId", deleteReview);

    function findAllReviewsByMovieId(req, res) {
        var movieId = req.params.movieId;
        var reviews = model.findAllReviewsByMovieId(movieId);
        res.json(reviews);
    }

    function movieAvgRatingByMovieId(req, res) {
        var movieId = req.params.movieId;
        var avgRating = model.movieAvgRatingByMovieId(movieId);
        res.json(avgRating);
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var review = req.body;
        var reviews = model.addReview(userId, movieId, review);
        res.json(reviews);
    }

    function updateReview(req, res) {
        var movieId = req.params.movieId;
        var reviewId = req.params.reviewId;
        var review = req.body;
        var reviews = model.updateReview(movieId, reviewId, review);
        res.json(reviews);
    }

    function deleteReview(req, res) {
        var movieId = req.params.movieId;
        var reviewId = req.params.reviewId;
        var reviews = model.deleteReview(movieId, reviewId);
        res.json(reviews);
    }
}