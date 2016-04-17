"use strict";
module.exports = function (db) {
    var UserSchema = db.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String],
        type: {type: String, default: "assignment"}
    }, {collection: 'user'});
    return UserSchema;
};