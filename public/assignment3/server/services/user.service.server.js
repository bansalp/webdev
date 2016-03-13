module.exports = function (app, model) {
    app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user", findAllUsers);
    //app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUser);
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    //app.put("/api/assignment/user/:id", updateUser);
    //app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var reqUser = req.body;
        var users = model.createUser(reqUser);
        req.session.currentUser = reqUser;
        res.json(users);
    }

    function findUser(req, res) {
        var reqUsername = req.query.username;

        if (reqUsername) {
            var user = model.findUserByUsername(reqUsername);
            res.json(user);
        }
    }

    function findAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var reqUserId = req.params.id;
        var user = model.findUserById(reqUserId);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;
        var credentials = {
            "username": reqUsername,
            "password": reqPassword
        };
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var reqUserId = req.params.id;
        var reqUser = req.body;
        var users = model.updateUser(reqUserId, reqUser);
        res.json(users);
    }

    function deleteUser(req, res) {
        var reqUserId = req.params.id;
        var users = model.deleteUser(reqUserId);
        res.json(users);
    }
}