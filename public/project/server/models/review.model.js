"use strict";
module.exports = function (db) {
    var ReviewSchema = require("./review.schema.server.js")(db);
    var ReviewModel = db.model('mt_review', ReviewSchema);

    var api = {
        findAllReviewsByMovieId: findAllReviewsByMovieId,
        addReview: addReview,
        updateReview: updateReview,
        deleteReview: deleteReview,
        findAllReviewsByUserId: findAllReviewsByUserId
    };
    return api;

    function findAllReviewsByMovieId(movieId) {
        return ReviewModel.find({movieId: movieId});
    }

    function addReview(userId, movieId, review) {
        review.userId = userId;
        review.movieId = movieId;
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

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({userId: userId});
    }
}