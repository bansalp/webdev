"use strict";
module.exports = function (db) {
    var UserSchema = db.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        likes: [String],
        followers: [String],
        following: [String]
    }, {collection: 'mt_user'});
    return UserSchema;
};