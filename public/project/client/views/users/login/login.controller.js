(function () {

    angular
        .module("MovieTimeApp")
        .controller("LoginController", LoginController);

    function LoginController($state, UserService) {
        var vm = this;

        vm.login = login;

        function init() {

        }

        init();

        function login(user) {
            var flag = validateUser(user);

            if (flag) {
                if (user) {
                    UserService
                        .login(user)
                        .then(
                            function (response) {
                                var resUser = response.data;
                                if (resUser) {
                                    UserService.setCurrentUser(resUser);
                                    $state.go("profile.edit-profile", {userId: resUser._id});
                                }
                            },
                            function (err) {
                                vm.error = "Wrong username or password.";
                            });
                }
            }
            else {
                vm.error = "Something went wrong. Please try again.";
            }
        }

        function validateUser(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
            }
            else {
                flag = flag && false;
            }

            return flag;
        }
    }

})();
