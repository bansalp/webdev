(function() {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
        ];

        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByUsernameAndPassword(username, password, callback) {

        }

        function findAllUsers(callback) {

        }

        function createUser(user, callback) {
            var user = {
                "_id": (new Date).getTime(),
                "firstName": "",
                "lastName": "",
                "username": user.username,
                "password": user.password
            };

            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {

        }
    }

})();
