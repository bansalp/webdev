(function () {

    angular
        .module("MovieTimeApp")
        .controller("ChangePasswordController", ChangePasswordController);

    function ChangePasswordController(UserService) {
        var vm = this;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.loggedOnUser = user;
                                }
                            });
                    }
                });
        }

        init();
    }

})();