var mock = require("./user.mock.json");

module.exports = function () {
    var api = {
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username && mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function updateUser(userId, newUser) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u] = newUser;
                return newUser;
            }
        }
        return null;
    }

    function deleteUser(userId) {
        var index = findIndexByUserId(userId);
        mock.splice(index, 1);
        return mock;
    }

    function findIndexByUserId(userId) {
        var index = 0;
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === userId) {
                return index;
            }
            index++;
        }
    }
}