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
            UserService.findUserByCredentials(user, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            if (user != null) {
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }

})();
