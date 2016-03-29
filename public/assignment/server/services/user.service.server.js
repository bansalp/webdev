"use strict";
module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/logout", logout);

    function createUser(req, res) {
        var reqUser = req.body;
        userModel
            .createUser(reqUser)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(res, reqUsername) {
        userModel
            .findUserByUsername(reqUsername)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res, credentials) {
        userModel
            .findUserByCredentials(credentials)
            .then(
                function (user) {
                    if (user) {
                        req.session.currentUser = user;
                    }
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        if (reqUsername != null && reqPassword != null) {
            var credentials = {
                "username": reqUsername,
                "password": reqPassword
            };
            findUserByCredentials(req, res, credentials);
        }
        else if (reqUsername) {
            findUserByUsername(res, reqUsername);
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
        userModel
            .updateUser(reqUserId, reqUser)
            .then(
                function (user) {
                    return userModel.findUserByUsername(reqUser.username);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.session.currentUser = user;
                    }
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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