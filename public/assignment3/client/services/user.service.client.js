"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            deleteCurrentUser: deleteCurrentUser
        };
        return api;

        function findUserByCredentials(user) {
            return $http.get("/api/assignment/user?username=" + user.username + "&password=" + user.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId, callback) {
            var userIndex = getUserIndexById(userId);
            users.splice(userIndex, 1);
            callback(users);
        }

        function updateUser(user) {
            return $http.put("/api/assignment/user/" + user._id, user);
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
                    user = users[i];
                }
            }

            return user;
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $rootScope.user;
        }

        function deleteCurrentUser() {
            delete $rootScope.user;
        }
    }

})();