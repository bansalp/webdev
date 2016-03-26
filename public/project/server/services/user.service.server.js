"use strict";
module.exports = function (app, model) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/logout", logout);


    function createUser(req, res) {
        var reqUser = req.body;
        var users = model.createUser(reqUser);
        var user = model.findUserByUsername(reqUser.username);
        req.session.currentUser = user;
        res.json(users);
    }

    function findUser(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        if (reqUsername != null && reqPassword != null) {
            var credentials = {
                "username": reqUsername,
                "password": reqPassword
            };
            var user = model.findUserByCredentials(credentials);
            if (user) {
                req.session.currentUser = user;
            }
            res.json(user);
        }
        else if (reqUsername) {
            var user = model.findUserByUsername(reqUsername);
            res.json(user);
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function updateUser(req, res) {
        var reqUserId = req.params.id;
        var reqUser = req.body;
        var users = model.updateUser(reqUserId, reqUser);
        var user = model.findUserByUsername(reqUser.username);
        if (req.session.currentUser._id == user._id) {
            req.session.currentUser = user;
        }
        res.json(users);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = model.deleteUserById(userId);
        res.json(users);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}