(function () {

    angular
        .module("MovieTimeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($stateParams, UserService) {
        var vm = this;

        vm.navigateUserId = $stateParams.userId;
        vm.follow = follow;
        vm.unfollow = unfollow;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.loggedInUserId = user._id;
                        console.log("Want to follow: " + vm.navigateUserId);
                        console.log("Logged in as: " + vm.loggedInUserId)
                        isAlreadyFollowing();

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

        function follow() {
            UserService
                .follow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyFollowing = true;
                    }
                    else {
                        vm.alreadyFollowing = false;
                    }
                });
        }

        function unfollow() {
            UserService
                .unfollow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyFollowing = false;
                    }
                    else {
                        vm.alreadyFollowing = true;
                    }
                });
        }

        function isAlreadyFollowing() {
            UserService
                .isAlreadyFollowing(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    if (response.data) {
                        vm.alreadyFollowing = true;
                    }
                    else {
                        vm.alreadyFollowing = false;
                    }
                });
        }
    }

})();