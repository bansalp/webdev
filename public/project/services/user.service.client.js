(function () {

    angular
        .module("MovieTimeApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "role": "user", "email": "123@abc.com"
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "role": "admin", "email": "234@abc.com"
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "role": "user", "email": "345@abc.com"
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "role": "user", "email": "456@abc.com"
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "role": "user", "email": "567@abc.com"
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByIndex: findUserByIndex,
            findUserFirstNameByUserId: findUserFirstNameByUserId,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return api;

        function findUserByCredentials(user, callback) {
            var user = getValidUser(user.username, user.password);
            callback(user);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function findUserByIndex(index, callback) {
            var user = {
                "_id": users[index]._id,
                "firstName": users[index].firstName,
                "lastName": users[index].lastName,
                "username": users[index].username,
                "password": users[index].password,
                "role": users[index].role,
                "email": users[index].email
            };

            callback(user);
        }

        function findUserByUsername(user, callback) {
            var currUser = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === user.username) {
                    currUser = users[i];
                }
            }

            if (currUser != null) {
                callback(null);
            } else {
                callback(user);
            }
        }

        function createUser(user, callback) {
            var id = (new Date).getTime();

            var newUser = {
                "_id": id,
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "password": user.password,
                "email": user.email,
                "role": "user"
            }

            users.push(newUser);
            console.log(users);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            var userIndex = getUserIndexById(userId);
            users.splice(userIndex, 1);
            callback(users);
        }

        function updateUserById(userId, user, callback) {
            var userIndex = getUserIndexById(userId);
            users[userIndex] = {
                "_id": user._id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "role": user.role,
                "email": user.email
            }

            callback(users[userIndex]);
        }

        function getUserIndexById(userId) {
            var index = 0;

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    return index;
                }
                index++;
            }
        }

        function getValidUser(username, password) {
            var user = null;

            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    user = users[i]
                }
            }

            return user;
        }

        function findUserFirstNameByUserId(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    callback(users[i].firstName);
                }
            }
        }

        function setCurrentUser(user)
        {
            $rootScope.user = user;
        }

        function getCurrentUser()
        {
            return $rootScope.user;
        }
    }

})();