"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {
    var auth = authorized;
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/logout", logout);
    app.post('/api/assignment/register', register);

    passport.use('assignment', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

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
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}