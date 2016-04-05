(function () {

    angular
        .module("MovieTimeApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };
        return api;

        function findUserByCredentials(user) {
            return $http.get("/api/project/user?username=" + user.username + "&password=" + user.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function updateUser(user) {
            return $http.put("/api/project/user/" + user._id, user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function logout() {
            return $http.get("/api/project/logout");
        }
    }

})();