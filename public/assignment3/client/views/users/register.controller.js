"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                alert("User Already Exists");
            }
        }

        function redirectUserToProfileIfValid(user) {
            if (user != null) {
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }

})();