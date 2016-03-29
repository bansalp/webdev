"use strict";
module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")(db);
    var UserModel = db.model('UserModel', UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById
    };
    return api;

    function findAllUsers() {
        return UserModel.find();
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function updateUser(userId, user) {
        delete user._id;
        return UserModel.update({_id: userId}, {$set: user});
    }

    function deleteUserById(userId) {
        return UserModel.remove({_id: userId});
    }
}