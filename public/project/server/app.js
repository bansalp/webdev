"use strict";
module.exports = function (app, uuid) {
    var userModel = require("./models/user.model.js")(uuid);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var reviewModel = require("./models/review.model.js")(uuid);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
}