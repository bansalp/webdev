(function () {

    angular
        .module("MovieTimeApp")
        .controller("FollowersController", FollowersController);

    function FollowersController(UserService) {
        var vm = this;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllFollowersUsers(vm.user._id);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                    }
                });
        }

        init();
    }

})();