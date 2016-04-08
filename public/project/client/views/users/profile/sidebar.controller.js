(function () {

    angular
        .module("MovieTimeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($stateParams, UserService) {
        var vm = this;

        vm.navigateUserId = $stateParams.username;
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
    }

})();