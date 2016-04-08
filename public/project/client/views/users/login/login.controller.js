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
            UserService
                .findUserByCredentials(user)
                .then(function (response) {
                    var resUser = response.data;
                    if (resUser) {
                        UserService.setCurrentUser(resUser);
                        $state.go("profile.edit-profile", {userId: resUser._id});
                    }
                    else {
                        alert("Wrong username or password!")
                    }
                });
        }
    }

})();
