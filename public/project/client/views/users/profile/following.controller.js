(function () {

    angular
        .module("MovieTimeApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($q, $stateParams, UserService) {
        var vm = this;

        vm.navigateUserId = $stateParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return UserService.findAllFollowingUsers(vm.navigateUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        isAlreadyFollowing(vm.users);
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
    }

})();