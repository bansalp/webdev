"use strict";
module.exports = function (db) {
    var ReviewSchema = db.Schema({
        title: String,
        description: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        movieId: String,
        userId: String,
        rating: String
    }, {collection: 'mt_review'});
    return ReviewSchema;
};