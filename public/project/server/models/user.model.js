"use strict";
module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")(db);
    var UserModel = db.model('mt_user', UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        likeMovie: likeMovie,
        undoLikeMovie: undoLikeMovie,
        isMovieLiked: isMovieLiked
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

    function likeMovie(userId, movieId) {
        return UserModel.update({_id: userId}, {$addToSet: {likes: movieId}});
    }

    function undoLikeMovie(userId, movieId) {
        return UserModel.update({_id: userId}, {$pullAll: {likes: [movieId]}});
    }

    function isMovieLiked(userId, movieId) {
        return UserModel.findOne({_id: userId, likes: {$in: [movieId]}});
    }
}