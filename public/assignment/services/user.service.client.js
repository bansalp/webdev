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
            var i;
            for (i in users)
            {
                var usr = users[i];
                if (usr.username == username && usr.password == password)
                {
                    callback(usr);
                    return;
                }
            }

            callback(null);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var usr = {
                "_id": (new Date).getTime(),
                "firstName": "",
                "lastName": "",
                "username": user.username,
                "password": user.password,
                "email": user.email
            };

            users.push(usr);
            callback(usr);
        }

        function deleteUserById(userId, callback) {
            var i;
            for (i in users)
            {
                var usr = users[i];
                if (usr._id == userId)
                {
                    users.splice(i, 1);
                    callback(users);
                    return;
                }
            }

            callback(users);
        }

        function updateUser(userId, user, callback) {
            var i;
            for (i in users)
            {
                var usr = users[i];
                if (usr._id == userId)
                {
                    usr._id = user._id;
                    usr.firstName = user.firstName;
                    usr.lastName = user.lastName;
                    usr.username = user.username;
                    usr.password = user.password;
                    usr.email = user.email;

                    callback(usr);
                    return;
                }
            }

            callback(null);
        }
    }

})();
