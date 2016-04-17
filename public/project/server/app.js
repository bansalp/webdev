"use strict";
module.exports = function (app, db, userModel, security) {
    var movieModel = require("./models/movie.model.js")(db);
    var movieService = require("./services/movie.service.server.js")(app, movieModel);
    var userService = require("./services/user.service.server.js")(app, userModel, movieModel, security);
    var reviewModel = require("./models/review.model.js")(db);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel, movieModel);
}