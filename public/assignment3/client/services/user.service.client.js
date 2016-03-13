"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };
        return api;

        function findUserByCredentials(user) {
            return $http.get("/api/assignment/user?username=" + user.username + "&password=" + user.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/userby?username=" + username);
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function updateUser(user) {
            return $http.put("/api/assignment/user/" + user._id, user);
        }

        function setCurrentUser(username) {
            $rootScope.user = username;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.get("/api/assignment/logout");
        }
    }

})();