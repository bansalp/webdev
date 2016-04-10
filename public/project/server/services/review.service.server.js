"use strict";
module.exports = function (app, reviewModel) {
    app.get("/api/project/movie/:movieId/reviews", findAllReviewsByMovieId);
    app.post("/api/project/user/:userId/movie/:movieId", addReview);
    app.put("/api/project/movie/:movieId/review/:reviewId", updateReview);
    app.delete("/api/project/movie/:movieId/review/:reviewId", deleteReview);

    function findAllReviewsByMovieId(req, res) {
        var movieId = req.params.movieId;
        reviewModel
            .findAllReviewsByMovieId(movieId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var review = req.body.review;
        var movie = req.body.movie;
        reviewModel
            .addReview(userId, movieId, review, movie)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel
            .updateReview(reviewId, review)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel
            .deleteReview(reviewId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}