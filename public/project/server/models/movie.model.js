"use strict";

module.exports = function (db) {
    var MovieSchema = require("./movie.schema.server.js")(db);
    var MovieModel = db.model('mt_movie', MovieSchema);

    var api = {
        addMovie: addMovie,
        findMovieByMovieId: findMovieByMovieId
    };
    return api;

    function addMovie(movie) {
        var newMovie = {
            "title": movie.title,
            "imageUrl": movie.imageUrl
        };

        return MovieModel.findOneAndUpdate({_id: movie.id.toString()}, newMovie, {upsert: true});
    }

    function findMovieByMovieId(movieId) {
        return MovieModel.findById(movieId);
    }
}