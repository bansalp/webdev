"use strict";
module.exports = function (db) {
    var MovieSchema = db.Schema({
        _id: String,
        title: String,
        imageUrl: String
    }, {collection: 'mt_movie'});
    return MovieSchema;
};