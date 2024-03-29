(function () {

    angular
        .module("MovieTimeApp")
        .controller("FollowersController", FollowersController);

    function FollowersController($q, $stateParams, UserService) {
        var vm = this;

        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.navigateUserId = $stateParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return UserService.findAllFollowersUsers(vm.navigateUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        isAlreadyFollowing(vm.users);

                        UserService
                            .findUserById(vm.navigateUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navigatedUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function isAlreadyFollowing(users) {
            var promiseArray = [];
            var result = [];

            users.forEach(function (element, index, array) {
                promiseArray
                    .push(
                        UserService
                            .isAlreadyFollowing(vm.loggedInUserId, element._id)
                            .then(
                                function (response) {
                                    var user = element;

                                    if (user._id != vm.loggedInUserId) {
                                        if (response.data) {
                                            user.alreadyFollowing = true;
                                        }
                                        else {
                                            user.alreadyFollowing = false;
                                        }
                                    }
                                    else {
                                        user.itsMe = true;
                                    }

                                    result.push(user);
                                },
                                function (err) {
                                    console.log(err);
                                })
                    );
            });

            $q.all(promiseArray).then(function () {
                vm.users = result;
            });
        }

        function follow(index) {
            var userId = vm.users[index]._id;
            UserService
                .follow(vm.loggedInUserId, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.users[index].alreadyFollowing = true;
                    }
                    else {
                        vm.users[index].alreadyFollowing = false;
                    }
                });
        }

        function unfollow(index) {
            var userId = vm.users[index]._id;
            UserService
                .unfollow(vm.loggedInUserId, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.users[index].alreadyFollowing = false;
                    }
                    else {
                        vm.users[index].alreadyFollowing = true;
                    }
                });
        }
    }

})();