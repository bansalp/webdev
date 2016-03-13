var mock = require("./user.mock.json");

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(user) {
        for (var u in mock) {
            if (mock[u].username === user.username && mock[u].password === user.password) {
                return mock[u];
            }
        }
        return null;
    }
}