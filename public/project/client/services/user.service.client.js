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
            likeMovie: likeMovie,
            undoLikeMovie: undoLikeMovie,
            isMovieLiked: isMovieLiked,
            follow: follow,
            unfollow: unfollow,
            isAlreadyFollowing: isAlreadyFollowing,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowersUsers: findAllFollowersUsers,
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

        function likeMovie(userId, movieId) {
            return $http.put("/api/project/user/" + userId + "/movie/" + movieId + "/like");
        }

        function undoLikeMovie(userId, movieId) {
            return $http.put("/api/project/user/" + userId + "/movie/" + movieId + "/undolike");
        }

        function isMovieLiked(userId, movieId) {
            return $http.get("/api/project/user/" + userId + "/movie/" + movieId + "/ismovieliked");
        }

        function follow(loggedInUserId, navigateUserId) {
            return $http.put("/api/project/user/" + loggedInUserId + "/follows/" + navigateUserId);
        }

        function unfollow(loggedInUserId, navigateUserId) {
            return $http.put("/api/project/user/" + loggedInUserId + "/unfollows/" + navigateUserId);
        }

        function isAlreadyFollowing(loggedInUserId, navigateUserId) {
            return $http.get("/api/project/user/" + loggedInUserId + "/isalreadyfollowing/" + navigateUserId);
        }

        function findAllFollowingUsers(userId) {
            return $http.get("/api/project/user/" + userId + "/following");
        }

        function findAllFollowersUsers(userId) {
            return $http.get("/api/project/user/" + userId + "/followers");
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