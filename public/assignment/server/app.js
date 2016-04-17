"use strict";
module.exports = function (app, uuid, db, userModel, security) {
    var userService = require("./services/user.service.server.js")(app, userModel, security);
    var formModel = require("./models/form.model.js")(db);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldModel = require("./models/field.model.js")(formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}