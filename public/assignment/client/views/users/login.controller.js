"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function init() {

        }

        init();

        function login(user) {
            if (user)
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        },
                        function (err) {
                            alert("Wrong username or password!");
                        }
                    );
        }
    }

})();
