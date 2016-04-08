(function () {

    angular
        .module("MovieTimeApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($state, UserService) {
        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var resUser = response.data;
                    if (!resUser) {
                        UserService
                            .createUser(user)
                            .then(function (res) {
                                if (res.data) {
                                    redirectToProfile(res);
                                }
                            });
                    }
                    else {
                        alert("User already exists");
                    }
                });
        }

        function redirectToProfile(response) {
            var user = response.data;
            if (user) {
                UserService.setCurrentUser(user);
                $state.go("profile.edit-profile", {userId: user._id});
            }
        }
    }

})();