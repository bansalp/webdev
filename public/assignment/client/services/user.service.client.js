"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login,
            register: register,
            createUser: createUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUserAdmin: updateUserAdmin
        };
        return api;

        function updateUserAdmin(userId, user) {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function findUserByCredentials(user) {
            return $http.get("/api/assignment/user?username=" + user.username + "&password=" + user.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function updateUser(user) {
            return $http.put("/api/assignment/user/" + user._id, user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.get("/api/assignment/logout");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }
    }

})();