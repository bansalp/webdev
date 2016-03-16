module.exports = function (app, model) {
    app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user", findAllUsers);
    //app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/userby", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    //app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/logout", logout);

    function createUser(req, res) {
        var reqUser = req.body;
        var users = model.createUser(reqUser);
        var user = model.findUserByUsername(reqUser.username);
        req.session.currentUser = user;
        res.json(users);
    }

    function findUserByCredentials(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;
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

    function findUserByUsername(req, res) {
        var reqUsername = req.query.username;
        var user = model.findUserByUsername(reqUsername);
        res.json(user);
    }

    function updateUser(req, res) {
        var reqUserId = req.params.id;
        var reqUser = req.body;
        var users = model.updateUser(reqUserId, reqUser);
        var user = model.findUserByUsername(reqUser.username);
        req.session.currentUser = user;
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