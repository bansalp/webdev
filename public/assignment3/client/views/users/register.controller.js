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
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var resUser = response.data;
                    if (!resUser) {
                        UserService
                            .createUser(user)
                            .then(function (res) {
                                if (res.data) {
                                    UserService
                                        .findUserByUsername(user.username)
                                        .then(redirectToProfile);
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
                UserService.setCurrentUser(user.username);
                $location.url("/profile");
            }
        }
    }

})();