"use strict";
module.exports = function (db) {
    var MovieSchema = require("./movie.schema.server.js")(db);
    var MovieModel = db.model('mt_movie', MovieSchema);

    var api = {
        addMovie: addMovie
    };
    return api;

    function addMovie(movie) {
        var newMovie = {
            "_id": movie.id.toString(),
            "title": movie.title,
            "imageUrl": movie.imageUrl
        };

        return MovieModel.findOneAndUpdate({_id: newMovie._id}, newMovie, {upsert: true});
    }
}