"use strict";
module.exports = function (app, db) {
    var movieModel = require("./models/movie.model.js")(db);
    var movieService = require("./services/movie.service.server.js")(app, movieModel);
    var userModel = require("./models/user.model.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel, movieModel);
    var reviewModel = require("./models/review.model.js")(db);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel, movieModel);
}