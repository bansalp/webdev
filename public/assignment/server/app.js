"use strict";
module.exports = function (app, uuid) {
    var userModel = require("./models/user.model.js")(uuid);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formModel = require("./models/form.model.js")(uuid);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldModel = require("./models/field.model.js")(uuid);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}