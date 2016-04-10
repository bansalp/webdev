"use strict";
module.exports = function (db) {
    var ReviewSchema = require("./review.schema.server.js")(db);
    var ReviewModel = db.model('mt_review', ReviewSchema);
    var MovieSchema = require("./movie.schema.server.js")(db);
    var MovieModel = db.model('mt_movie', MovieSchema);

    var api = {
        findAllReviewsByMovieId: findAllReviewsByMovieId,
        addReview: addReview,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function findAllReviewsByMovieId(movieId) {
        return ReviewModel.find({movieId: movieId});
    }

    function addReview(userId, movieId, review, movie) {
        review.userId = userId;
        review.movieId = movieId;

        var newMovie = {
            "_id": movie.id.toString(),
            "title": movie.title,
            "imageUrl": movie.imageUrl
        };

        console.log(newMovie);

        MovieModel
            .findOneAndUpdate({_id: newMovie._id}, newMovie, {upsert: true})
            .then(function (response) {
                    console.log(response);
                },
                function (err) {
                    console.log(err);
                });
        return ReviewModel.create(review);
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = new Date();
        return ReviewModel.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }
}